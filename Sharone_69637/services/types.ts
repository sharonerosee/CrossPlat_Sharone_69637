export type RootStackParamList = {
    Home: undefined;
    Forms: {
      post: { id: number; title: string; body: string };
      updatePost: (updatedPost: {
        id: number;
        title: string;
        body: string;
      }) => void;
    };
  };