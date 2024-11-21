export interface contact {
  contactId: string;
  tag: string;
  contacts: contacts;
}

export interface contacts {
  type: string;
  value: string;
}