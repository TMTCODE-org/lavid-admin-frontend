export interface TypeCategory {
  id: number;
  name: string;
}

export const mapToTypeCategory = (data: any): TypeCategory => {
  if (!data) {
    return {
      id: 0,
      name: ''
    };
  }

  return {
    id: data.id,
    name: data.name
  };
};
