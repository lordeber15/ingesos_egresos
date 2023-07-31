import style from "./egresos.module.css";
import { Button, Tfoot } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import {
  Text,
  CircularProgress,
  NumberInput,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputStepper,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import moment from "moment";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getEgresos, createEgresos } from "../../request/egresos";

export default function Egresos() {
  const {
    isLoading,
    data: dataEgresos,
    isError,
    error,
  } = useQuery({
    queryKey: ["egresos"],
    queryFn: getEgresos,
  });

  const queryClient = useQueryClient();

  const addEgresosMutation = useMutation({
    mutationFn: createEgresos,
    onSuccess: () => {
      toastSuccess("Egreso Agregado");
      queryClient.invalidateQueries("egresos");
    },
  });
  const toast = useToast();
  const [valueSelect, setValueSelect] = useState("");
  const [valueInput, setInput] = useState(0.0);
  const [monto, setMonto] = useState(0);

  useEffect(() => {
    handlerSuma();
  }, [dataEgresos]);

  const handlerSuma = () => {
    try {
      let suma = 0;
      dataEgresos.forEach((elemento) => {
        suma += parseFloat(elemento.monto);
      });
      setMonto(suma.toFixed(2));
    } catch (error) {
      return console.log(error.message);
    }
  };

  if (isLoading) {
    return (
      <div className={style.loading}>
        <CircularProgress isIndeterminate color="green.300" />
      </div>
    );
  } else if (isError) {
    return <div className={style.error}>Error: {error.message}</div>;
  }

  const handlerChangeSelect = (e) => {
    setValueSelect(e.target.value);
  };
  const handlerChangeInput = (e) => {
    setInput(e);
  };
  const handlerReset = () => {
    setValueSelect("");
    setInput(0.0);
  };

  const handlerClickEgresos = () => {
    if (valueSelect == "" && valueInput == 0) {
      return toastView("Debes Seleccionar un egreso e ingresar un monto");
    } else if (valueInput == 0) {
      return toastView("Debes egresar un monto");
    } else if (valueSelect == "") {
      return toastView("Debes Seleccionar un egreso");
    }
    addEgresosMutation.mutate({
      egreso: valueSelect,
      monto: valueInput,
    });
    handlerSuma();
    handlerReset();
  };

  const toastView = (title) => {
    toast({
      position: "top",
      title: title,
      status: "error",
      duration: 7000,
      isClosable: true,
    });
  };
  const toastSuccess = (title) => {
    toast({
      position: "top",
      title: title,
      status: "success",
      duration: 7000,
      isClosable: true,
    });
  };

  return (
    <div className={style.container}>
      <Text as="b" className={style.title}>
        EGRESOS DE {moment().format("D/MM/YYYY")}
      </Text>
      <div className={style.containerInput}>
        <Select
          value={valueSelect}
          onChange={handlerChangeSelect}
          placeholder="Seleciona una Opcion"
          required
        >
          <option value="Materiales">Materiales</option>
          <option value="Gastos">Gastos</option>
          <option value="otros">Otros</option>
        </Select>
        <NumberInput
          onChange={handlerChangeInput}
          value={valueInput}
          min={0.0}
          defaultValue={0.1}
          precision={2}
          step={0.1}
          required
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Button
          className={style.buttonAdd}
          onClick={handlerClickEgresos}
          colorScheme="blue"
        >
          Agregar
        </Button>
      </div>
      <div className={style.containerLabel}>
        {dataEgresos.length == 0 ? (
          <div>Hoy aun no registraste un Egreso</div>
        ) : (
          <TableContainer>
            <Table variant="simple">
              <TableCaption>
                Recuerda Anotar todos los Egresos que tengas
              </TableCaption>
              <Thead>
                <Tr>
                  <Th align="center">ID</Th>
                  <Th>EGRESO</Th>
                  <Th>MONTO</Th>
                </Tr>
              </Thead>
              <Tbody>
                {dataEgresos.map((elemento) => {
                  return (
                    <Tr key={elemento.id}>
                      <Td>{elemento.id}</Td>
                      <Td>{elemento.egreso}</Td>
                      <Td>{elemento.monto}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th></Th>
                  <Th>Total</Th>
                  <Th>{monto}</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
}
