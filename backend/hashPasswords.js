require("dotenv").config();

const bcrypt = require("bcrypt");
const db = require("./config/db");

async function hashPasswords() {
  try {
    // Hash admin password
    const adminHash = await bcrypt.hash("admin123", 10);

    db.query(
      "UPDATE admins SET password=? WHERE username='admin'",
      [adminHash],
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Admin password updated");
        }
      }
    );

    // Hash supplier password
    const supplierHash = await bcrypt.hash("supplier123", 10);

    db.query(
      "UPDATE suppliers SET password=? WHERE supplier_id='SUP1001'",
      [supplierHash],
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Supplier password updated");
        }

        console.log("Done");
        process.exit();
      }
    );
  } catch (err) {
    console.log(err);
  }
}

hashPasswords();