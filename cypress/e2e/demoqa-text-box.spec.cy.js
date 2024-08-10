describe("DemoQA Text Box", () => {
  const url = "https://demoqa.com/text-box";
  const selectors = {
    fullName: "#userName",
    email: "#userEmail",
    currentAddress: "#currentAddress",
    permanentAddress: "#permanentAddress",
    submit: "#submit",
    output: "#output",
  };

  const expectedPlaceholders = {
    fullName: "Full Name",
    email: "name@example.com",
    currentAddress: "Current Address",
    permanentAddress: "Permanent Address",
  };

  beforeEach(() => {
    cy.visit(url);
    cy.on("uncaught:exception", () => false);
  });

  const fillForm = (data) => {
    cy.get(selectors.fullName).type(data.fullName);
    cy.get(selectors.email).type(data.email);
    cy.get(selectors.currentAddress).type(data.currentAddress);
    cy.get(selectors.permanentAddress).type(data.permanentAddress);
  };

  const submitForm = () => {
    cy.get(selectors.submit).click();
  };

  const validateOutput = (data) => {
    cy.get(`${selectors.output} #name`).should("contain.text", data.fullName);
    cy.get(`${selectors.output} #email`).should("contain.text", data.email);
    cy.get(`${selectors.output} #currentAddress`).should(
      "contain.text",
      data.currentAddress
    );
    cy.get(`${selectors.output} #permanentAddress`).should(
      "contain.text",
      data.permanentAddress
    );
  };

  it("Test 1: UI", () => {
    cy.get("header > a > img").should("be.visible");
    cy.get(selectors.fullName).should("be.visible");
    cy.get(selectors.email).should("be.visible");
    cy.get(selectors.currentAddress).should("be.visible");
    cy.get(selectors.permanentAddress).should("be.visible");
    cy.get(selectors.submit).should("be.visible");

    cy.get(".text-center").should("be.visible");
    cy.get("#userName-label").should("be.visible");
    cy.get("#userEmail-label").should("be.visible");
    cy.get("#currentAddress-label").should("be.visible");
    cy.get("#permanentAddress-label").should("be.visible");

    Object.entries(expectedPlaceholders).forEach(([key, value]) => {
      cy.get(selectors[key]).should("have.attr", "placeholder", value);
    });
  });

  it("Test 2: Input Validity", () => {
    const testData = {
      fullName: "John Doe",
      email: "johndoe@example.com",
      currentAddress: "123 Main St, Springfield",
      permanentAddress: "456 Elm St, Metropolis",
    };

    fillForm(testData);
    submitForm();
    validateOutput(testData);
  });

  it("Test 3: Empty Fields", () => {
    submitForm();
    cy.fail("Site does not have such feature");
  });

  it("Test 4: Error Messages", () => {
    fillForm({
      fullName: "John Doe",
      email: "invalid-email",
      currentAddress: "123 Main St, Springfield",
      permanentAddress: "456 Elm St, Metropolis",
    });
    submitForm();

    cy.get(selectors.email)
      .should("have.class", "field-error")
      .and("have.class", "form-control");
  });

  it("Test 5: Maximum Character Limit", () => {
    const longText = "a".repeat(1000);
    fillForm({
      fullName: longText,
      email: `${longText}@example.com`,
      currentAddress: longText,
      permanentAddress: longText,
    });
    submitForm();

    cy.get(selectors.fullName)
      .invoke("val")
      .should("have.length.at.most", 1000);
    cy.get(selectors.email).invoke("val").should("have.length.at.most", 1012);
    cy.get(selectors.currentAddress)
      .invoke("val")
      .should("have.length.at.most", 1000);
    cy.get(selectors.permanentAddress)
      .invoke("val")
      .should("have.length.at.most", 1000);
  });

  it("Test 6: Special Characters", () => {
    const specialCharacters = `!@#$%^&*()_+[]{}|;:'",.<>?/~\`-=\\"`;
    const testData = {
      fullName: specialCharacters,
      email: `test${specialCharacters}@example.com`,
      currentAddress: specialCharacters,
      permanentAddress: specialCharacters,
    };

    fillForm(testData);
    submitForm();
    validateOutput(testData);
  });

  it("Test 7: Field Formatting", () => {
    const testData = {
      fullName: "   John Doe   ",
      email: "eXaMpLe@ExAmPlE.cOm",
      currentAddress: "  123  Main  St  ",
      permanentAddress: "   456  Elm  St   ",
    };

    fillForm(testData);
    submitForm();

    cy.get(`${selectors.output} #name`).should("contain.text", "John Doe");
    cy.get(`${selectors.output} #email`).should(
      "contain.text",
      "example@example.com"
    );
    cy.get(`${selectors.output} #currentAddress`).should(
      "contain.text",
      "123 Main St"
    );
    cy.get(`${selectors.output} #permanentAddress`).should(
      "contain.text",
      "456 Elm St"
    );
  });

  it("Test 8: Form does not Reset", () => {
    const testData = {
      fullName: "John Doe",
      email: "john.doe@example.com",
      currentAddress: "123 Main St",
      permanentAddress: "456 Elm St",
    };

    fillForm(testData);
    submitForm();

    Object.entries(testData).forEach(([key, value]) => {
      cy.get(selectors[key]).should("have.value", value);
    });
  });

  it("Test 9: Accessibility", () => {
    cy.get(selectors.fullName).click().type("John Doe");
    cy.realPress("Tab");
    cy.focused().type("john.doe@example.com");
    cy.realPress("Tab");
    cy.focused().type("123 Main St");
    cy.realPress("Tab");
    cy.focused().type("456 Elm St");
    cy.realPress("Tab");
    cy.realPress("Enter");

    validateOutput({
      fullName: "John Doe",
      email: "john.doe@example.com",
      currentAddress: "123 Main St",
      permanentAddress: "456 Elm St",
    });
  });
});
