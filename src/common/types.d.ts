export interface TableItem {
  _id: string;
  uid: string;
  title: string;
  author: string;
  last_updated: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  document?: any;
}


export interface Document {
  content: string;
}