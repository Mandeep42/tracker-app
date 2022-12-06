export default function () {
  // form required validation
  const required = (v: any) => {
    return !!v || "Field is required";
  };

  return {
    required,
  };
}
