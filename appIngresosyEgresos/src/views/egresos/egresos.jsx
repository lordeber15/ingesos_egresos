import style from "./egresos.module.css";
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
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

export default function Egresos() {
  const toast = useToast();
  const [labelEgresos, setLabelEgresos] = useState([]);
  const [valueId, setValueId] = useState(1);
  const [valueSelect, setValueSelect] = useState("");
  const [valueInput, setInput] = useState(0.0);
  const [monto, setMonto] = useState(0);
  const date = new Date();
  const handlerSuma = () => {
    let suma = 0;
    labelEgresos.forEach((elemento) => {
      suma += parseFloat(elemento.monto);
    });
    setMonto(suma.toFixed(2));
  };
  useEffect(() => {
    handlerSuma();
  }, [labelEgresos]);
  const handlerCLicID = () => {
    setValueId(valueId + 1);
  };
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
      return toastView("Debes ingresar un monto");
    } else if (valueSelect == "") {
      return toastView("Debes Seleccionar un Egreso");
    }
    handlerSuma();
    handlerCLicID();
    setLabelEgresos((prevLabelEgresos) => [
      ...prevLabelEgresos,
      { id: valueId, egresos: valueSelect, monto: valueInput },
    ]);
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

  return (
    <div className={style.container}>
      <Text as="b" className={style.title}>
        EGRESOS DE{" "}
        {date.getDate() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getFullYear()}
      </Text>
      <div className={style.containerInput}>
        <Select
          value={valueSelect}
          onChange={handlerChangeSelect}
          placeholder="Seleciona una Opcion"
          required
        >
          <option value="Fotocopias">Fotocopias</option>
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
          onClick={handlerClickEgresos}
          colorScheme="blue"
        >
          Agregar
        </Button>
      </div>
      <div className={style.containerLabel}>
        {labelEgresos.length == 0 ? (
          <div></div>
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
                {labelEgresos.map((elemento) => {
                  return (
                    <Tr key={elemento.id}>
                      <Td>{elemento.id}</Td>
                      <Td>{elemento.egresos}</Td>
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
