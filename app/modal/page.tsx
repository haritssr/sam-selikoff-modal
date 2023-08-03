"use client";

import { Contact, useContacts } from "../../lib/contacts";
import { FormEvent, useState } from "react";
import Modal from "./modal";

interface IndividualContact {
  id: string;
  name: string;
  role: string;
  email: string;
}

export default function Page() {
  let { contacts } = useContacts();
  return (
    <header>
      <div className="flex items-center justify-between bg-white text-zinc-800 p-4">
        <div className="">Wah</div>
        <Modal>
          <Modal.Button asChild>
            <button>Button</button>
          </Modal.Button>
          <Modal.Content title="About Wah">
            <ol>
              <li>im a list</li>
              <li>im a list</li>
              <li>im a list</li>
            </ol>
          </Modal.Content>
        </Modal>
      </div>
      <div className="p-5">
        <div className="mx-auto max-w-sm space-y-4 rounded-lg bg-gray-300 p-4">
          {contacts.map((contact: IndividualContact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      </div>
    </header>
  );
}

function ContactCard({ contact }: { contact: Contact }) {
  let [open, setOpen] = useState(false);

  return (
    <div
      className="flex justify-between rounded-lg bg-white px-4 py-4 text-gray-800 shadow"
      key={contact.id}
    >
      <div>
        <p>{contact.name}</p>
        <p className="text-sm text-gray-500">{contact.role}</p>
        <p className="text-sm text-gray-500">{contact.email}</p>
      </div>
      <div>
        <Modal open={open} onOpenChange={setOpen}>
          <Modal.Button className="rounded-full hover:bg-gray-500 bg-gray-300 p-3"></Modal.Button>

          <Modal.Content title="Edit Contact">
            <ContactForm contact={contact} afterSave={() => setOpen(false)} />
          </Modal.Content>
        </Modal>
      </div>
    </div>
  );
}

function ContactForm({
  contact,
  afterSave,
}: {
  contact: Contact;
  afterSave: () => void;
}) {
  let { updateContact } = useContacts();
  let [saving, setSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    let data = Object.fromEntries(new FormData(event.currentTarget));
    await updateContact(contact.id, data);
    afterSave();
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset disabled={saving} className="group">
        <div className="mt-8 group-disabled:opacity-50">
          <div className="space-y-4 mt-4">
            <section>
              <label className="text-sm font-medium text-gray-900">Name</label>
              <input
                type="text"
                autoFocus
                className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm text-gray-900 shadow-sm sm:leading-6"
                defaultValue={contact.name}
                name="name"
              />
            </section>
            <section>
              <label className="text-sm font-medium text-gray-900">Role</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm text-gray-900 shadow-sm sm:leading-6"
                defaultValue={contact.role}
                name="role"
              />
            </section>
            <section>
              <label className="text-sm font-medium text-gray-900">Email</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm text-gray-900 shadow-sm sm:leading-6"
                defaultValue={contact.email}
                name="email"
              />
            </section>
          </div>
        </div>
        <section className="mt-8 flex justify-end space-x-3">
          <Modal.Close className="px-3 py-1.5 rounded-md bg-white text-gray-700 text-sm hover:bg-gray-100 hover:border-gray-400 border border-gray-300 font-medium">
            Cancel
          </Modal.Close>
          <button className="inline-flex justify-center items-center px-3 py-1.5 rounded-md bg-green-500 text-white text-sm hover:bg-green-600 font-medium group-disabled:pointer-events-none">
            <span className="absolute group-enabled:opacity-0">Saving...</span>
            <span className="group-disabled:opacity-0">save</span>
          </button>
        </section>
      </fieldset>
    </form>
  );
}
