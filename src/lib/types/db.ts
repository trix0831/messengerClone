export type User = {
  id: string;
  username: string;
  email: string;
  provider: "github" | "credentials";
};

export type Document = {
  id: string;
  title: string;
  content: string;
  announcement: string;
  deleteCreater: boolean;
  deleteFriend: boolean;
};

export type Chat = {
  id: string;
  senderId: string;
  documentId: string;
  message: string;
}