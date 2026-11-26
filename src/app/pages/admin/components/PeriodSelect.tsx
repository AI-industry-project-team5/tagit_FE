import AdminSelect from '@pages/admin/components/AdminSelect';
import { ADMIN_PERIOD_OPTIONS } from '@pages/admin/constants/period';
import type { AdminPeriod } from '@shared/types/admin';

interface PeriodSelectProps {
  value: AdminPeriod;
  onChange: (period: AdminPeriod) => void;
}

/** 기간 선택 드롭다운 (Figma Date Filter) */
const PeriodSelect = ({ value, onChange }: PeriodSelectProps) => {
  return (
    <AdminSelect
      label="기간"
      value={value}
      options={ADMIN_PERIOD_OPTIONS}
      onChange={onChange}
    />
  );
};

export default PeriodSelect;
