import { check } from "./check";

check().then((passed) => {
  if (!passed) {
    process.exit(1);
  } else {
    process.exit(0);
  }
});