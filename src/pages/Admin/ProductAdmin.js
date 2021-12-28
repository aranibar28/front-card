import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import {
  HeaderPage,
  TableProductAdmin,
  AddEditProductForm,
} from "../../components/Admin";
import { ModalBasic } from "../../components/Common";
import { useProduct } from "../../hooks";
import Swal from "sweetalert2";

export function ProductAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(null);
  const { loading, products, getProducts, deleteProduct } = useProduct();

  useEffect(
    () => getProducts(),
    [refetch] // eslint-disable-line
  );

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);
  const addProduct = () => {
    setTitleModal("Nuevo Producto");
    setContentModal(
      <AddEditProductForm onClose={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };

  const updateProduct = (data) => {
    setTitleModal("Actualizar Producto");
    setContentModal(
      <AddEditProductForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        product={data}
      />
    );
    openCloseModal();
  };

  const onDeleteProduct = async (data) => {
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
          `El producto ${data.title} ha sido eliminado.`,
          "success"
        );
        await deleteProduct(data.id);
        onRefetch();
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return (
    <>
      <HeaderPage
        title="Productos"
        btnTitle="Nuevo Producto"
        btnClick={addProduct}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TableProductAdmin
          products={products}
          updateProduct={updateProduct}
          deleteProduct={onDeleteProduct}
        />
      )}
      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}
      />
    </>
  );
}
