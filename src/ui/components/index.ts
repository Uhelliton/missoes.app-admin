/**
 * Exports centralizados dos componentes UI
 * Componentes de formulário seguem a convenção K* (padrão bootstrap-vue-next)
 */

// ===== FORMS =====
export {
  KButton,
  KInput,
  KTextarea,
  KPassword,
  KSelect,
  KCheckbox,
  KRadio,
  KSwitch,
  KDatePicker,
} from './ui/forms';

/*// ===== CARD =====
export {
  KCard,
  KCardAction,
  KCardContent,
  KCardDescription,
  KCardFooter,
  KCardHeader,
  KCardTitle,
} from './ui/card';*/

// ===== TABS =====


// ===== TABLE =====
export {
  KDataTable,
  KTable, // Alias para KDataTable
} from './table';

// ===== DIALOG/MODAL =====
export {
  KDialog,
  KModal, // Alias para KDialog
} from './dialog';

// ===== LAYOUTS =====
// Não exportamos layouts aqui pois são específicos da aplicação
// Mas estão disponíveis em @/ui/components/layouts/*
