export type ContainerLayout = {
  sendAnalyticsData: (
    eventName: string,
    eventMetadata: Record<string, any>,
  ) => void;
};
