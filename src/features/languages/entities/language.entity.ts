export interface Language {
  id: number;
  code: string;
  name: string;
}

export const mapToLanguage = (data: any): Language => {
  if (!data) {
    return {
      id: 0,
      code: '',
      name: ''
    };
  }

  return {
    id: data.id,
    code: data.code,
    name: data.name
  };
};
