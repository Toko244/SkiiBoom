import type { Metadata } from 'next';
import EquipmentRentalInteractive from './components/EquipmentRentalInteractive';

export const metadata: Metadata = {
  title: 'Equipment Rental - SkiBoomGudauri',
  description: 'Browse our comprehensive collection of premium ski and snowboard equipment. From beginner-friendly gear to expert-level performance equipment with professional fitting and flexible rental periods.',
};

export default function EquipmentRentalPage() {
  return <EquipmentRentalInteractive />;
}