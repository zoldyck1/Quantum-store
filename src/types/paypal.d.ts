declare global {
  interface Window {
    paypal?: {
      Buttons: (config: {
        createOrder: (data: any, actions: any) => Promise<any>;
        onApprove: (data: any, actions: any) => Promise<any>;
        onError: (err: any) => void;
      }) => {
        render: (selector: string) => void;
      };
    };
  }
}

export {};