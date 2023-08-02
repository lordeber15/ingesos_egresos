import style from "./landing.module.css";
import { Button, Tfoot } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import {
  Text,
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
  CircularProgress,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import moment from "moment";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getIngresos, createIngresos } from "../../request/ingresos.js";

export default function Landing() {
  const {
    isLoading,
    data: dataIngresos,
    isError,
    error,
  } = useQuery({
    queryKey: ["ingresos"],
    queryFn: getIngresos,
  });

  const queryClient = useQueryClient();

  const addIngresosMutation = useMutation({
    mutationFn: createIngresos,
    onSuccess: () => {
      toastSuccess("Ingreso Agregado");
      queryClient.invalidateQueries("ingresos");
    },
  });
  const toast = useToast();
  const [valueSelect, setValueSelect] = useState("");
  const [valueInput, setInput] = useState(0.0);
  const [monto, setMonto] = useState(0);

  useEffect(() => {
    handlerSuma();
  }, [dataIngresos]);

  const handlerSuma = () => {
    try {
      let suma = 0;
      dataIngresos.forEach((elemento) => {
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

  const handlerClickIngresos = () => {
    if (valueSelect == "" && valueInput == 0) {
      return toastView("Debes Seleccionar un ingreso e ingresar un monto");
    } else if (valueInput == 0) {
      return toastView("Debes ingresar un monto");
    } else if (valueSelect == "") {
      return toastView("Debes Seleccionar un ingreso");
    }
    addIngresosMutation.mutate({
      ingreso: valueSelect,
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
        INGRESOS DE {moment().format("D/MM/YYYY")}
      </Text>
      <div className={style.containerInput}>
        <Select
          value={valueSelect}
          onChange={handlerChangeSelect}
          placeholder="Seleciona una Opcion"
          required
        >
          <option value="Fotocopias">Fotocopias</option>
          <option value="Impresiones">Impresiones</option>
          <option value="Formatos">Formatos</option>
          <option value="Libreria">Libreria</option>
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
          onClick={handlerClickIngresos}
          colorScheme="blue"
        >
          Agregar
        </Button>
      </div>
      <div className={style.containerLabel}>
        {dataIngresos.length == 0 ? (
          <div className={style.containerLabel}>
            <p>Hoy aun no se tienen reguistros</p>
          </div>
        ) : (
          <TableContainer>
            <Table variant="simple">
              <TableCaption>
                Recuerda Anotar todos los Ingresos que tengas
              </TableCaption>
              <Thead>
                <Tr>
                  <Th align="center">ID</Th>
                  <Th>INGRESO</Th>
                  <Th>MONTO</Th>
                </Tr>
              </Thead>
              <Tbody>
                {dataIngresos.map((elemento) => {
                  return (
                    <Tr key={elemento.id}>
                      <Td>{elemento.id}</Td>
                      <Td>{elemento.ingreso}</Td>
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
