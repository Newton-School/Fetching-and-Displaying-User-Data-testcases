describe("fetch and sort data", () => {
	it("fetches data from the correct API endpoint", () => {
		cy.visit("http://localhost:3000/");
		cy.intercept("GET", "https://jsonplaceholder.typicode.com/users").as(
			"fetchUsers"
		);
		cy.wait("@fetchUsers").its("response.statusCode").should("equal", 200);
	});
	it("renders a table with the correct columns", () => {
		cy.visit("http://localhost:3000/");
		cy.get("table")
			.should("contain", "ID")
			.should("contain", "Name")
			.should("contain", "Email")
			.should("contain", "Phone")
			.should("contain", "Website");
	});
	it("fetches and displays user data", () => {
		cy.visit("http://localhost:3000/");
		cy.get("tbody tr").should("have.length", 10);
		cy.get("tbody tr:first-child td:first-child").should("contain", "1");
		cy.get("tbody tr:first-child td:nth-child(2)").should(
			"contain",
			"Leanne Graham"
		);
	});
	it("user data is sorted by ID", () => {
		cy.visit("http://localhost:3000/");
		cy.get("thead th:first-child").click();
		cy.get("tbody tr:first-child td:first-child").should("contain", "1");
		cy.get("tbody tr:nth-child(2) td:first-child").should("contain", "2");
		cy.get("tbody tr:last-child td:first-child").should("contain", "10");
	});
});
