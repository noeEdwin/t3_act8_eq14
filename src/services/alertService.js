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
      <div class="aura-swal-form">
        <div class="aura-swal-field">
          <label for="swal-title">Nombre del producto *</label>
          <input id="swal-title" class="aura-swal-control" placeholder="Ej: Sofá Nórdico Minimal" value="${initialData?.title || ''}">
        </div>
        <div class="aura-swal-field">
          <label for="swal-category">Categoría *</label>
          <input id="swal-category" class="aura-swal-control" placeholder="Ej: furniture, beauty, fragrances" value="${initialData?.category || ''}">
        </div>
        <div class="aura-swal-grid">
          <div class="aura-swal-field">
            <label for="swal-price">Precio ($) *</label>
            <input id="swal-price" type="number" step="0.01" min="0" class="aura-swal-control" placeholder="0.00" value="${initialData?.price !== undefined ? initialData.price : ''}">
          </div>
          <div class="aura-swal-field">
            <label for="swal-stock">Stock (u.) *</label>
            <input id="swal-stock" type="number" min="0" class="aura-swal-control" placeholder="0" value="${initialData?.stock !== undefined ? initialData.stock : ''}">
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
      <div class="aura-swal-form">
        <div class="aura-swal-field">
          <label for="swal-sale-product">Producto *</label>
          <input id="swal-sale-product" class="aura-swal-control" placeholder="Ej: Sofá Nórdico Minimal" value="${initialData?.product || ''}">
        </div>
        <div class="aura-swal-field">
          <label for="swal-sale-brand">Marca *</label>
          <input id="swal-sale-brand" class="aura-swal-control" placeholder="Ej: Aura Hogar" value="${initialData?.brand || 'Aura Hogar'}">
        </div>
        <div class="aura-swal-field">
          <label for="swal-sale-category">Categoría *</label>
          <select id="swal-sale-category" class="aura-swal-control">
            <option value="">Selecciona una categoría</option>
            ${categoryOptions}
          </select>
        </div>
        <div class="aura-swal-grid">
          <div class="aura-swal-field">
            <label for="swal-sale-units">Unidades *</label>
            <input id="swal-sale-units" type="number" min="1" class="aura-swal-control" placeholder="1" value="${initialData?.units || 1}">
          </div>
          <div class="aura-swal-field">
            <label for="swal-sale-total">Total ($) *</label>
            <input id="swal-sale-total" type="number" step="0.01" min="0.01" class="aura-swal-control" placeholder="0.00" value="${initialData?.total ?? ''}">
          </div>
        </div>
        <div class="aura-swal-field">
          <label for="swal-sale-status">Estado *</label>
          <select id="swal-sale-status" class="aura-swal-control">
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
