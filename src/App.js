import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Row,
  Col,
  Button,
  Input,
  Modal,
  ModalBody,
  Label,
  Container,
  Form,
  FormGroup,
} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import Select from "react-select";
import md5 from "md5";
import moment from "moment";

export default function App() {
  //data

  const [registeredDate, setRegisteredDate] = useState(new Date());

  const dummy = [
    {
      id: 1,
      name: "deby trisandi",
      email: "dbts92@gmail.com",
      noHp: "081270011080",
      lvl: "admin",
      role: "IT Developer, IT FA, IT Operation",
      status: "User",
      password: "512153153",
      registeredDate: registeredDate.toString(),
      effectiveDate: " 01 /09/2023",
    },
  ];

  const [data, setData] = useState(dummy);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [noHp, setNohp] = useState("");
  const [date, setDate] = useState("");
  const [password, setPassword] = useState("");
  const [comfPassword, setComfPassword] = useState("");
  const [modalAdd, setModalAdd] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const toggle = () => setModalAdd(!modalAdd);

  const columns = [
    { dataField: "id", text: "UserID" },
    {
      dataField: "name",
      text: "User Name",
    },
    { dataField: "email", text: "Email" },
    { dataField: "noHp", text: "HP/WA" },
    { dataField: "lvl", text: "Account Level" },
    { dataField: "role", text: "Role" },
    { dataField: "status", text: "Status" },
    { dataField: "password", text: "Password" },
    {
      dataField: "registeredDate",
      text: "RegisteredDate",
      formatter: (cell, row) => moment(cell).format("DD/MM/YYYY"),
    },
    {
      dataField: "effectiveDate",
      text: "EffectiveDate",
      formatter: (cell, row) => moment(cell).format("DD/MM/YYYY"),
    },
  ];

  const handleModalAdd = () => {
    setModalAdd(!modalAdd);
  };

  const handleAdd = () => {
    if (name.trim() === "" || email.trim() === "" || noHp.trim() === "") {
      return alert("Mohon isi semua data terlebih dahulu");
    }
    // const priceInt = parseInt(price);
    let dataThatWillAdded = {
      name,
      email,
      noHp,
      id: data.length + 1,
      registeredDate: registeredDate.toString(),
      password: md5(password),
      lvl: selectedLevel.value,
      role: selectedRoles.map((role) => role.value),
      status: selectedOption,
      effectiveDate: date.toString(),
    };

    setData([...data, dataThatWillAdded]);
    setName("");
    setEmail("");
    setNohp("");
    setDate("");
    setRegisteredDate(new Date()); //
    setModalAdd(false);
  };

  useEffect(() => {}, [data, comfPassword]);

  console.log(comfPassword);

  const options = [
    { value: "Administrator", label: "Administrator" },
    { value: "User", label: "User" },
  ];
  const optionsdata = [
    { value: "IT Network", label: "IT Network" },
    { value: "IT Developer", label: "IT Developer" },
    { value: "IT FA", label: "IT FA" },
    { value: "IT Operation", label: "IT Operation" },
    { value: "Finance", label: "Finance" },
    { value: "Accounting", label: "Accounting" },
    { value: " Sales & Marketing", label: " Sales & Marketing" },
  ];

  const [selectedLevel, setSelectedLevel] = useState(options[0]); // Default to "Administrator"
  const [selectedRoles, setSelectedRoles] = useState([]); // Default to an empty array

  const handleLevelChange = (selectedOption) => {
    setSelectedLevel(selectedOption);
  };

  const handleRolesChange = (selectedOptions) => {
    setSelectedRoles(selectedOptions);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="app">
      <Container>
        <Row className="my-3">
          <center>
            <h1>List User</h1>
          </center>
        </Row>
        <Col className="d-flex justify-content-between my-3">
          <h5>Data user</h5>
          <Button className="add" onClick={() => handleModalAdd()}>
            Add Data
          </Button>
        </Col>
        <BootstrapTable keyField="id" data={data} columns={columns} />
      </Container>
      <Modal isOpen={modalAdd} toggle={toggle} centered size="lg">
        <ModalBody className="modal-create">
          <Row>
            <Label className="text-center fw-bold uppercase">Registrasi</Label>
            <Col md={12}>
              <Form>
                <FormGroup row>
                  <Label for="name" sm={2}>
                    Name
                  </Label>
                  <Col sm={10}>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      invalid={name.length > 20}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="email" sm={2}>
                    Email
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="nohp" sm={2}>
                    No Hp
                  </Label>
                  <Col sm={10}>
                    <Input
                      id="nomorHp"
                      name="noHp"
                      placeholder="Nomor Hp"
                      type="number"
                      invalid={noHp.length > 13}
                      onChange={(e) => setNohp(e.target.value)}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="accoutLevel" sm={2}>
                    Account Level
                  </Label>
                  <Col sm={10}>
                    <Select
                      options={options}
                      value={selectedLevel}
                      onChange={handleLevelChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="role" sm={2}>
                    Role
                  </Label>
                  <Col sm={10}>
                    <Select
                      isMulti
                      options={optionsdata}
                      value={selectedRoles}
                      onChange={handleRolesChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="status" sm={2}>
                    Status
                  </Label>
                  <Col sm={10}>
                    <div className="d-flex gap-2">
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            name="noHp"
                            value="Active"
                            checked={selectedOption === "Active"}
                            onChange={handleOptionChange}
                          />
                          Active
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            name="noHp"
                            value="Not Active"
                            checked={selectedOption === "Not Active"}
                            onChange={handleOptionChange}
                          />
                          Not Active
                        </Label>
                      </FormGroup>
                    </div>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail" sm={2}>
                    Password
                  </Label>
                  <Col sm={10}>
                    <div className="d-flex">
                      <Input
                        className="w-50 me-1"
                        id="examplePassword"
                        name="password"
                        placeholder="Password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <Input
                        valid={password === comfPassword}
                        invalid={password !== comfPassword}
                        className="w-50 "
                        id="confirmpassword"
                        name="comfpassword"
                        placeholder="Comfirmasi Password"
                        type="password"
                        onChange={(e) => setComfPassword(e.target.value)}
                      />
                    </div>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail" sm={2}>
                    EffectiveDate
                  </Label>
                  <Col sm={10}>
                    <Input
                      id="effectiveDate"
                      name="effectiveDate"
                      placeholder="Effective Date"
                      type="date"
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </Col>
                </FormGroup>

                <Button onClick={() => handleAdd()}> Add</Button>
              </Form>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
}
