import React, { useState } from "react";
import { Container, Tab, Nav } from "react-bootstrap";
import css from "./Settings.module.css";
import Version from "./Version";

const Settings = () => {
  const [activeKey, setActiveKey] = useState("version");

  return (
    <Container className={css.settings_container}>
      <h4>Settings</h4>
      <Tab.Container activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
        <Nav variant="tabs" className="mt-3">
          <Nav.Item>
            <Nav.Link eventKey="version" className="text-black">
              Version
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="other" className="text-black">
              Other
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="mt-3">
          <Tab.Pane eventKey="version">
            <Version />
          </Tab.Pane>
          <Tab.Pane eventKey="other">
            <div>Other Settings</div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
};

export default Settings;
