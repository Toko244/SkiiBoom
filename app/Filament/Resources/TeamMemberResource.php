<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TeamMemberResource\Pages;
use App\Models\TeamMember;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class TeamMemberResource extends Resource
{
    protected static ?string $model = TeamMember::class;

    protected static ?string $navigationIcon = 'heroicon-o-user-group';

    protected static ?string $navigationGroup = 'About Us';

    protected static ?int $navigationSort = 1;

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Personal Info')
                            ->icon('heroicon-o-user')
                            ->schema([
                                Forms\Components\TextInput::make('name')
                                    ->required()
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('role')
                                    ->label('Job Title')
                                    ->required()
                                    ->maxLength(255)
                                    ->placeholder('e.g., Head Instructor, Manager'),
                                Forms\Components\TextInput::make('experience_years')
                                    ->label('Years of Experience')
                                    ->numeric()
                                    ->suffix('years'),
                            ])
                            ->columns(2),

                        Forms\Components\Section::make('Bio & Qualifications')
                            ->icon('heroicon-o-document-text')
                            ->schema([
                                Forms\Components\Textarea::make('bio')
                                    ->rows(4)
                                    ->columnSpanFull()
                                    ->placeholder('Write a brief biography...'),
                                Forms\Components\TagsInput::make('certifications')
                                    ->placeholder('Add certification')
                                    ->columnSpanFull(),
                            ]),
                    ])
                    ->columnSpan(['lg' => 2]),

                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Photo')
                            ->icon('heroicon-o-camera')
                            ->schema([
                                Forms\Components\FileUpload::make('image_path')
                                    ->label('Profile Photo')
                                    ->directory('team')
                                    ->disk('public')
                                    ->image()
                                    ->imageResizeMode('cover')
                                    ->imageCropAspectRatio('1:1')
                                    ->imagePreviewHeight('200')
                                    ->circleCropper(),
                            ]),

                        Forms\Components\Section::make('Visibility')
                            ->icon('heroicon-o-eye')
                            ->schema([
                                Forms\Components\Toggle::make('active')
                                    ->label('Show on Website')
                                    ->default(true)
                                    ->onColor('success')
                                    ->offColor('danger')
                                    ->inline(false),
                                Forms\Components\TextInput::make('sort_order')
                                    ->label('Display Order')
                                    ->numeric()
                                    ->default(0),
                            ]),
                    ])
                    ->columnSpan(['lg' => 1]),
            ])
            ->columns(3);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image_path')
                    ->label('')
                    ->disk('public')
                    ->circular()
                    ->size(45)
                    ->defaultImageUrl(fn () => 'https://placehold.co/45x45/e2e8f0/94a3b8?text=?'),
                Tables\Columns\TextColumn::make('name')
                    ->label('Name')
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->description(fn (TeamMember $record) => $record->role),
                Tables\Columns\TextColumn::make('experience_years')
                    ->label('Experience')
                    ->suffix(' years')
                    ->sortable(),
                Tables\Columns\ToggleColumn::make('active')
                    ->label('Visible')
                    ->onColor('success')
                    ->offColor('danger'),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('active')
                    ->label('Visible'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('sort_order')
            ->reorderable('sort_order')
            ->striped()
            ->emptyStateHeading('No team members')
            ->emptyStateDescription('Add team members to show on the About Us page.')
            ->emptyStateIcon('heroicon-o-user-group');
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTeamMembers::route('/'),
            'create' => Pages\CreateTeamMember::route('/create'),
            'edit' => Pages\EditTeamMember::route('/{record}/edit'),
        ];
    }
}
