import { useHelmets } from '../../hooks/useHelmets';

import { HelmetsForm } from '../../components/edit_create_form/edit_create_form';

export default function EditFormPage() {
  const { currentHelmet } = useHelmets();

  if (!currentHelmet?.id) {
    return (
      <div>
        <HelmetsForm helmet={currentHelmet!} />;
      </div>
    );
  } else {
    return (
      <div>
        <HelmetsForm helmet={currentHelmet} />;
      </div>
    );
  }
}
