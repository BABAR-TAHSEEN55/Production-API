// import { it } from "node:test";
// import { describe } from "yargs";

import supertest from "supertest";
import CreateServer from "../utils/server";

const app = CreateServer();
describe("HealthCheck", () => {
    describe("check HealthCheck route", () => {
        describe("Given that the HealthCheck route is working ", () => {
            it("Should return a 200", async () => {
                await supertest(app).get("/healthcheck").expect(200);
            });
        });
    });
});

describe("product", () => {
    describe("Get Product Route", () => {
        describe("Given that Product does not exists", () => {
            it("Should return a 404", async () => {
                const ProductId = "Product-123";
                await supertest(app)
                    .get(`/api/Product/${ProductId}`)
                    .expect(404);
            });
        });
    });
});
