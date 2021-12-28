import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import {
  HeaderPage,
  TableCategoryAdmin,
  AddEditCategoryForm,
} from "../../components/Admin";
import { useCategory } from "../../hooks";
import { ModalBasic } from "../../components/Common";
import Swal from "sweetalert2";

export function CategoriesAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const { loading, categories, getCategories, deleteCategory } = useCategory();
  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);

  const addCategory = () => {
    setTitleModal("Nueva Categoría");
    setContentModal(
      <AddEditCategoryForm onClose={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };

  const updateCategory = (data) => {
    setTitleModal("Actualizar Categoría");
    setContentModal(
      <AddEditCategoryForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        category={data}
      />
    );
    openCloseModal();
  };
 
  const onDeleteCategory = async (data) => {
    try {
      const alert = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, Eliminar!",
        cancelButtonText: "No, Cancelar",
      });
      if (alert.isConfirmed) {
        Swal.fire(
          "Eliminado",
          `La categoría ${data.title} ha sido eliminado.`,
          "success"
        );
        await deleteCategory(data.id);
        onRefetch();
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  useEffect(() => {
    getCategories();
  }, [refetch]); // eslint-disable-line

  return (
    <div>
      <HeaderPage
        title="Categorias"
        btnTitle="Nueva Categoría"
        btnClick={addCategory}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TableCategoryAdmin
          categories={categories}
          updateCategory={updateCategory}
          deleteCategory={onDeleteCategory}
        />
      )}
      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}
      />
    </div>
  );
}
