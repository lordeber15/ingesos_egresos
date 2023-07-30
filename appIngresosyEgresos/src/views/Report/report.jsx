import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  CircularProgress,
} from "@chakra-ui/react";
import style from "./report.module.css";
import { useQuery } from "@tanstack/react-query";
import { getReport } from "../../request/reports.js";
import moment from "moment";

export default function Report() {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["reportes"],
    queryFn: getReport,
  });
  if (isLoading)
    return (
      <div className={style.loading}>
        <CircularProgress isIndeterminate color="green.300" />
      </div>
    );
  else if (isError)
    return <div className={style.error}>Error: {error.message}</div>;

  return (
    <div className={style.container}>
      <Text as="b" className={style.title}>
        Dias de trabajo
      </Text>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Fechas de todos los Ingresos Registrados</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Fecha</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((elemento) => {
              return (
                <Tr key={elemento.id}>
                  <Td>{elemento.id}</Td>
                  <Td>{moment(elemento.report).format("D/MM/YYY")}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}
