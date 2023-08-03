"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Contact, useContacts } from "../../lib/contacts";
import { FormEvent, useState } from "react";

interface IndividualContact {
  id: string;
  name: string;
  role: string;
  email: string;
}

export default function Page() {
  let { contacts } = useContacts();
  return (
    <div className="p-5">
      <div className="mx-auto max-w-sm space-y-4 rounded-lg bg-gray-300 p-4">
        {contacts.map((contact: IndividualContact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </div>
    </div>
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
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger className="rounded-full hover:bg-gray-500 bg-gray-300 p-3"></Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="data-[state=open]:animate-[dialog-overlay-show_200ms] data-[state=closed]:animate-[dialog-overlay-hide_200ms] fixed inset-0 bg-black/50 p-5" />
            <Dialog.Content className="data-[state=open]:animate-[dialog-content-show_200ms] data-[state=closed]:animate-[dialog-content-hide_200ms] fixed top-1/2 left-1/2 bg-white text-gray-900 p-8 -translate-x-1/2 -translate-y-1/2 shadow rounded-md w-full text-md max-w-md">
              <div className="flex justify-between items-center">
                <Dialog.Title className="text-xl">Edit contact</Dialog.Title>
                <Dialog.Close className="items-center flex justify-center p-3 bg-gray-300 hover:bg-gray-400 rounded-full"></Dialog.Close>
              </div>
              <ContactForm contact={contact} afterSave={() => setOpen(false)} />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
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
            <div>
              <label className="text-sm font-medium text-gray-900">Name</label>
              <input
                type="text"
                autoFocus
                className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm text-gray-900 shadow-sm sm:leading-6"
                defaultValue={contact.name}
                name="name"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-900">Role</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm text-gray-900 shadow-sm sm:leading-6"
                defaultValue={contact.role}
                name="role"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-900">Email</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm text-gray-900 shadow-sm sm:leading-6"
                defaultValue={contact.email}
                name="email"
              />
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-end space-x-3">
          <Dialog.Close className="px-3 py-1.5 rounded-md bg-white text-gray-700 text-sm hover:bg-gray-100 hover:border-gray-400 border border-gray-300 font-medium">
            Cancel
          </Dialog.Close>
          <button className="inline-flex justify-center items-center px-3 py-1.5 rounded-md bg-green-500 text-white text-sm hover:bg-green-600 font-medium group-disabled:pointer-events-none">
            <span className="absolute group-enabled:opacity-0">Saving...</span>
            <span className="group-disabled:opacity-0">save</span>
          </button>
        </div>
      </fieldset>
    </form>
  );
}
