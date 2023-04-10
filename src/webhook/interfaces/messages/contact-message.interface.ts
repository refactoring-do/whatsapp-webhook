interface Name {
  first_name: string;
  formatted_name: string;
}

interface Phone {
  phone: string;
  type: string;
}

export interface ContactMessage {
  name: Name;
  phones: Phone[];
}
