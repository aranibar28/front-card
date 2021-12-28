import React, { useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { HeaderPage, TablesListAdmin } from "../../components/Admin";
import { useTable } from "../../hooks";

export function OrdersAdmin() {
  const { loading, tables, getTables } = useTable();

  useEffect(() => getTables(), []); // eslint-disable-line

  return (
    <>
      <HeaderPage title="Lista de Mesas" />
      {loading ? (
        <Loader active inlined="centered">
          Cargando...
        </Loader>
      ) : (
        <TablesListAdmin tables={tables} />
      )}
    </>
  );
}
