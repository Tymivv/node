const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  try {
    return console.log(await fs.readFile(contactsPath, "utf-8"));
  } catch (err) {
    return console.log(err.message);
  }
}

async function getContactById(contactId) {
  // ...твой код
  try {
    const contactsAll = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    const result = contactsAll.find((item) => parseInt(item.id) === contactId);
    return console.log(result || null);
  } catch (err) {
    return console.log(err.message);
  }
}

async function removeContact(contactId) {
  try {
    const contactsAll = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    const index = contactsAll.findIndex((item) => item.id === contactId);
    if (index === -1) {
      return console.log(null);
    }
    const [result] = contactsAll.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contactsAll, null, 4));
    return console.log(result);
  } catch (err) {
    return console.log(err.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    data.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 4));
    return console.log(newContact);
  } catch (error) {
    return console.log(error.message);
  }
}

async function updateById(id, name, email, phone) {
  const contactsAll = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
  const index = contactsAll.findIndex((item) => item.id === id);
  if (index === -1) {
    return console.log(null);
  }
  contactsAll[index] = { id, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(contactsAll, null, 4));
  return console.log(contactsAll[index]);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateById,
};
