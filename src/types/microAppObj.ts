import { ContainerLayout } from "./containerLayout";

export interface IMicroAppsObj {
  relativeUrl: string;
  leftsidebarContainerDom: string;
  org_uid: string | null;
  token: string | null;
  project_id: string;
  currentUser: any;
  currentOrganization?: any;
  headerContainerDom?: string;
  extentionUtils?: {
    stackQueryCreator: any;
    queHttp: any;
  };
  planFeatures?: any;
  containerLayout?: ContainerLayout;
  callback?: any;
  stacks?: Record<string, any>[];
}
