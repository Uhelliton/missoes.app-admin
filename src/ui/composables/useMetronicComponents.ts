/**
 * Composable para inicializar componentes Metronic automaticamente
 */
import { onMounted, onUpdated, nextTick } from 'vue';
import {
  KTSelect,
  KTDatePicker,
  KTColorPicker,
  KTMenu,
  KTDataTable,
  KTModal,
  KTDrawer,
  KTDropdown,
  KTTabs,
  KTAccordion,
  KTTooltip
} from '../theme/init';

/**
 * Hook para inicializar automaticamente TODOS os componentes Metronic
 * Use este composable no DefaultLayout para inicialização global
 *
 * Inicializa automaticamente qualquer elemento com:
 * - data-kt-select
 * - data-kt-date-picker
 * - data-kt-color-picker
 * - data-kt-menu
 * - data-kt-datatable
 * - data-kt-modal
 * - data-kt-drawer
 * - data-kt-dropdown
 * - data-kt-tabs
 * - data-kt-accordion
 * - data-kt-tooltip
 */
export function useMetronicComponents(debug = false) {
  const initializeComponents = () => {
    nextTick(() => {
      setTimeout(() => {
        try {
          if (debug) {
            console.log('[Metronic] Iniciando componentes...');
          }

          // Inicializar componentes KTUI automaticamente (já funcionam)
          (KTSelect as any).createInstances?.();
          (KTDataTable as any).createInstances?.();
          (KTModal as any).createInstances?.();
          (KTDrawer as any).createInstances?.();
          (KTDropdown as any).createInstances?.();
          (KTAccordion as any).createInstances?.();
          (KTTooltip as any).createInstances?.();

          // KTColorPicker e KTMenu (inicialização automática)
          (KTColorPicker as any).createInstances?.();

          // KTMenu - verificar se está inicializando
          const menuElements = document.querySelectorAll('[data-kt-menu="true"]');
          if (debug) {
            console.log('[Metronic] KTMenu elementos encontrados:', menuElements.length);
          }
          (KTMenu as any).createInstances?.();

          if (debug) {
            console.log('[Metronic] Componentes KTUI e Menu/ColorPicker inicializados');
          }

        } catch (e) {
          console.error('[Metronic] Erro ao inicializar componentes:', e);
        }

        // Inicializar KTDatePicker manualmente (não funciona bem com createInstances)
        const datePickerElements = document.querySelectorAll('[data-kt-date-picker="true"]:not([data-kt-date-picker-initialized])');
        datePickerElements.forEach((el) => {
          try {
            new KTDatePicker(el as HTMLElement);
            el.setAttribute('data-kt-date-picker-initialized', 'true');
          } catch (e) {
            console.warn('Erro ao inicializar KTDatePicker:', e);
          }
        });

        // Inicializar KTTabs manualmente (para evitar problemas de inicialização)
        const tabsElements = document.querySelectorAll('[data-kt-tabs="true"]:not([data-kt-tabs-initialized])');
        tabsElements.forEach((el) => {
          try {
            new KTTabs(el as HTMLElement);
            el.setAttribute('data-kt-tabs-initialized', 'true');
          } catch (e) {
            console.warn('Erro ao inicializar KTTabs:', e);
          }
        });

        // Inicialização manual do menu da sidebar
        const menuItems = document.querySelectorAll('[data-kt-menu-item-trigger="click"]');
        menuItems.forEach((item) => {
          const menuLink = item.querySelector('.kt-menu-link');
          if (menuLink) {
            menuLink.addEventListener('click', function (e) {
              e.preventDefault();
              const parent = this.closest('.kt-menu-item');
              const accordion = parent?.querySelector('.kt-menu-accordion');

              if (accordion) {
                const isOpen = parent.classList.contains('show');
                parent.classList.toggle('show', !isOpen);
                accordion.style.display = isOpen ? 'none' : 'block';
              }
            });
          }
        });
      }, 150);
    });
  };

  // Inicializar quando o componente é montado
  onMounted(() => {
    initializeComponents();
  });

  // Re-inicializar quando o componente é atualizado (para conteúdo dinâmico)
  onUpdated(() => {
    initializeComponents();
  });

  // Retornar função para inicialização manual se necessário
  return {
    initializeComponents,
  };
}
