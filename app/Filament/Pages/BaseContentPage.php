<?php

namespace App\Filament\Pages;

use App\Services\ContentService;
use Filament\Actions\Action;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Illuminate\Support\Facades\Storage;

abstract class BaseContentPage extends Page implements HasForms
{
    use InteractsWithForms;

    protected static string $view = 'filament.pages.manage-page-content';

    protected static ?string $navigationGroup = 'Content Management';

    public ?array $data = [];

    abstract protected static function getPageSlug(): string;

    abstract protected static function getPageTitle(): string;

    abstract protected function formSchema(): array;

    public function mount(): void
    {
        $content = app(ContentService::class)->getPageContent(static::getPageSlug());

        $this->sanitizeContentForFileUploads($content);

        $this->form->fill($content);
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema($this->formSchema())
            ->statePath('data');
    }

    public function save(): void
    {
        $oldData = app(ContentService::class)->getPageContent(static::getPageSlug());
        $data = $this->form->getState();

        $this->cleanupReplacedFiles($oldData, $data);

        app(ContentService::class)->savePageContent(static::getPageSlug(), $data);

        Notification::make()
            ->title('Content saved successfully.')
            ->success()
            ->send();
    }

    public function getFormActions(): array
    {
        return [
            Action::make('save')
                ->label('Save Content')
                ->submit('save'),
        ];
    }

    /**
     * Strip external URLs from fields that are now FileUpload components,
     * so the upload field starts empty instead of erroring on a URL string.
     */
    private function sanitizeContentForFileUploads(array &$content): void
    {
        array_walk_recursive($content, function (&$value, $key) {
            if (is_string($value) && str_starts_with($value, 'http') && preg_match('/image/i', $key)) {
                $value = null;
            }
        });
    }

    /**
     * Delete old uploaded files from disk when they are replaced or removed.
     */
    private function cleanupReplacedFiles(array $oldData, array $newData): void
    {
        $oldFiles = $this->extractFilePaths($oldData);
        $newFiles = $this->extractFilePaths($newData);

        foreach (array_diff($oldFiles, $newFiles) as $removedFile) {
            Storage::disk('public')->delete($removedFile);
        }
    }

    private function extractFilePaths(array $data, array &$paths = []): array
    {
        foreach ($data as $key => $value) {
            if (is_array($value)) {
                $this->extractFilePaths($value, $paths);
            } elseif (is_string($value) && !str_starts_with($value, 'http') && preg_match('/image/i', $key) && Storage::disk('public')->exists($value)) {
                $paths[] = $value;
            }
        }

        return $paths;
    }
}
