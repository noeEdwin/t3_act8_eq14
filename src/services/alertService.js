import Swal from 'sweetalert2';

const COLOR_PRIMARY = '#735851';
const COLOR_CANCEL = '#817471';
const COLOR_BG = '#fff8f6';

export async function showConfirmDialog({ 
  title = '¿Estás seguro?', 
  text = 'Esta acción no se puede deshacer.', 
  confirmButtonText = 'Sí, continuar',
  cancelButtonText = 'Cancelar'
} = {}) {
  const result = await Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: COLOR_PRIMARY,
    cancelButtonColor: COLOR_CANCEL,
    confirmButtonText,
    cancelButtonText,
    background: COLOR_BG,
    customClass: {
      popup: 'rounded-2xl border border-gray-200 shadow-xl font-sans',
      title: 'font-serif text-gray-900',
    }
  });

  return result.isConfirmed;
}

export async function showProductFormModal(initialData = null) {
  const isEditing = Boolean(initialData);
  
  const result = await Swal.fire({
    title: isEditing ? 'Editar Producto' : 'Registrar Nuevo Producto',
    html: `
      <div class="flex flex-col gap-4 text-left mt-2 font-sans">
        <div>
          <label class="block text-xs font-bold text-[#735851] uppercase tracking-wider mb-1">Nombre del producto *</label>
          <input id="swal-title" class="swal2-input !m-0 !w-full !rounded-lg !border-gray-300 !text-sm !h-10 px-3" placeholder="Ej: Sofá Nórdico Minimal" value="${initialData?.title || ''}">
        </div>
        <div>
          <label class="block text-xs font-bold text-[#735851] uppercase tracking-wider mb-1">Categoría *</label>
          <input id="swal-category" class="swal2-input !m-0 !w-full !rounded-lg !border-gray-300 !text-sm !h-10 px-3" placeholder="Ej: furniture, beauty, fragrances" value="${initialData?.category || ''}">
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-bold text-[#735851] uppercase tracking-wider mb-1">Precio ($) *</label>
            <input id="swal-price" type="number" step="0.01" min="0" class="swal2-input !m-0 !w-full !rounded-lg !border-gray-300 !text-sm !h-10 px-3" placeholder="0.00" value="${initialData?.price !== undefined ? initialData.price : ''}">
          </div>
          <div>
            <label class="block text-xs font-bold text-[#735851] uppercase tracking-wider mb-1">Stock (u.) *</label>
            <input id="swal-stock" type="number" min="0" class="swal2-input !m-0 !w-full !rounded-lg !border-gray-300 !text-sm !h-10 px-3" placeholder="0" value="${initialData?.stock !== undefined ? initialData.stock : ''}">
          </div>
        </div>
      </div>
    `,
    background: COLOR_BG,
    showCancelButton: true,
    confirmButtonColor: COLOR_PRIMARY,
    cancelButtonColor: COLOR_CANCEL,
    confirmButtonText: isEditing ? 'Guardar Cambios' : 'Registrar Producto',
    cancelButtonText: 'Cancelar',
    focusConfirm: false,
    customClass: {
      popup: 'rounded-2xl border border-gray-200 shadow-xl !p-6 !max-w-md w-full',
      title: 'font-serif text-2xl text-gray-900 !m-0 !p-0',
    },
    
    preConfirm: () => {
      const title = document.getElementById('swal-title').value.trim();
      const category = document.getElementById('swal-category').value.trim();
      const price = document.getElementById('swal-price').value;
      const stock = document.getElementById('swal-stock').value;

      if (!title || !category || price === '' || stock === '') {
        Swal.showValidationMessage('Por favor completa todos los campos obligatorios (*)');
        return false;
      }

      if (Number(price) < 0 || Number(stock) < 0) {
        Swal.showValidationMessage('El precio y el stock deben ser números positivos');
        return false;
      }

      return {
        title,
        category: category.toLowerCase(),
        price: Number(price),
        stock: Number(stock),
        brand: initialData?.brand || 'Aura Hogar',
        description: initialData?.description || 'Producto registrado en catálogo Aura Hogar'
      };
    }
  });

  return result.isConfirmed ? result.value : null;
}

export async function showSaleFormModal(categories = [], initialData = null) {
  const isEditing = Boolean(initialData);
  const categoryOptions = categories
    .map(
      (category) =>
        `<option value="${category.slug}" ${category.slug === initialData?.categorySlug ? 'selected' : ''}>${category.name}</option>`
    )
    .join('');

  const result = await Swal.fire({
    title: isEditing ? 'Editar Venta' : 'Registrar Nueva Venta',
    html: `
      <div class="flex flex-col gap-4 text-left mt-2 font-sans">
        <div>
          <label class="block text-xs font-bold text-[#735851] uppercase tracking-wider mb-1">Producto *</label>
          <input id="swal-sale-product" class="swal2-input !m-0 !w-full !rounded-lg !border-gray-300 !text-sm !h-10 px-3" placeholder="Ej: Sofá Nórdico Minimal" value="${initialData?.product || ''}">
        </div>
        <div>
          <label class="block text-xs font-bold text-[#735851] uppercase tracking-wider mb-1">Marca *</label>
          <input id="swal-sale-brand" class="swal2-input !m-0 !w-full !rounded-lg !border-gray-300 !text-sm !h-10 px-3" placeholder="Ej: Aura Hogar" value="${initialData?.brand || 'Aura Hogar'}">
        </div>
        <div>
          <label class="block text-xs font-bold text-[#735851] uppercase tracking-wider mb-1">Categoría *</label>
          <select id="swal-sale-category" class="swal2-input !m-0 !w-full !rounded-lg !border-gray-300 !text-sm !h-10 px-3">
            <option value="">Selecciona una categoría</option>
            ${categoryOptions}
          </select>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-bold text-[#735851] uppercase tracking-wider mb-1">Unidades *</label>
            <input id="swal-sale-units" type="number" min="1" class="swal2-input !m-0 !w-full !rounded-lg !border-gray-300 !text-sm !h-10 px-3" placeholder="1" value="${initialData?.units || 1}">
          </div>
          <div>
            <label class="block text-xs font-bold text-[#735851] uppercase tracking-wider mb-1">Total ($) *</label>
            <input id="swal-sale-total" type="number" step="0.01" min="0.01" class="swal2-input !m-0 !w-full !rounded-lg !border-gray-300 !text-sm !h-10 px-3" placeholder="0.00" value="${initialData?.total ?? ''}">
          </div>
        </div>
        <div>
          <label class="block text-xs font-bold text-[#735851] uppercase tracking-wider mb-1">Estado *</label>
          <select id="swal-sale-status" class="swal2-input !m-0 !w-full !rounded-lg !border-gray-300 !text-sm !h-10 px-3">
            <option value="sent" ${initialData?.statusValue === 'sent' || !initialData ? 'selected' : ''}>Enviado</option>
            <option value="pending" ${initialData?.statusValue === 'pending' ? 'selected' : ''}>Pendiente</option>
            <option value="processing" ${initialData?.statusValue === 'processing' ? 'selected' : ''}>Preparando</option>
          </select>
        </div>
      </div>
    `,
    background: COLOR_BG,
    showCancelButton: true,
    confirmButtonColor: COLOR_PRIMARY,
    cancelButtonColor: COLOR_CANCEL,
    confirmButtonText: isEditing ? 'Guardar Cambios' : 'Registrar Venta',
    cancelButtonText: 'Cancelar',
    focusConfirm: false,
    customClass: {
      popup: 'rounded-2xl border border-gray-200 shadow-xl !p-6 !max-w-md w-full',
      title: 'font-serif text-2xl text-gray-900 !m-0 !p-0',
    },
    preConfirm: () => {
      const product = document.getElementById('swal-sale-product').value.trim();
      const brand = document.getElementById('swal-sale-brand').value.trim();
      const category = document.getElementById('swal-sale-category').value.trim();
      const units = document.getElementById('swal-sale-units').value;
      const total = document.getElementById('swal-sale-total').value;
      const status = document.getElementById('swal-sale-status').value;

      if (!product || !brand || !category || units === '' || total === '') {
        Swal.showValidationMessage('Por favor completa todos los campos obligatorios (*)');
        return false;
      }

      if (Number(units) < 1 || Number(total) <= 0) {
        Swal.showValidationMessage('Las unidades y el total deben ser mayores a cero');
        return false;
      }

      return {
        product,
        brand,
        category,
        units: Number(units),
        total: Number(total),
        status,
      };
    }
  });

  return result.isConfirmed ? result.value : null;
}

export function showSuccessAlert(title = '¡Operación exitosa!', text = '') {
  return Swal.fire({
    title,
    text,
    icon: 'success',
    confirmButtonColor: COLOR_PRIMARY,
    confirmButtonText: 'Aceptar',
    background: COLOR_BG,
    timer: 2500,
    timerProgressBar: true
  });
}

export function showErrorAlert(title = 'Ocurrió un error', text = 'No se pudo completar la operación.') {
  return Swal.fire({
    title,
    text,
    icon: 'error',
    confirmButtonColor: COLOR_PRIMARY,
    confirmButtonText: 'Entendido',
    background: COLOR_BG
  });
}
