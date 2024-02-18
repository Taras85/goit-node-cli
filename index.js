import { program } from "commander";
import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact,
} from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      // return console.log(allContacts);
      return console.table(allContacts);
      break;

    case "get":
      const oneContact = await getContactById(id);
      return console.table( oneContact);
      break;

    case "add":
      const newContact = await addContact({ name, email, phone });
      return console.table(newContact);
      break;

    case "remove":
      const deleteContact = await removeContact(id);
      return console.table( deleteContact);
      break;
    case "update":
      const updateBiId = await updateContact(id, { name, email, phone });
      return console.table(updateBiId);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
