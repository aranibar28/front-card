import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import {
  HeaderPage,
  TableTablesAdmin,
  AddEditTableForm,
} from "../../components/Admin";
import { ModalBasic } from "../../components/Common";
import { useTable } from "../../hooks";
import Swal from "sweetalert2";

export function TablesAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);

  const { loading, tables, getTables, deleteTable } = useTable();

  useEffect(
    () => getTables(),
    [refetch] // eslint-disable-line
  );

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);

  const addTable = () => {
    setTitleModal("Nueva Mesa");
    setContentModal(
      <AddEditTableForm onClose={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };

  const updateTable = (data) => {
    setTitleModal("Actualizar mesa");
    setContentModal(
      <AddEditTableForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        table={data}
      />
    );
    openCloseModal();
  };

  const onDeleteTable = async (data) => {
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
          `La mesa ${data.number} ha sido eliminado.`,
          "success"
        );
        await deleteTable(data.id);
        onRefetch();
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return (
    <>
      <HeaderPage title="Mesas" btnTitle="Nueva Mesa" btnClick={addTable} />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TableTablesAdmin
          tables={tables}
          updateTable={updateTable}
          deleteTable={onDeleteTable}
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
