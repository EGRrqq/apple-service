import { Test } from "../_framework";

new Test<string>("testin error state, for logger").expect("buhhh").toBe("");

