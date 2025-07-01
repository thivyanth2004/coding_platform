// import axios from 'axios';

// const handleSubmit = async () => {
//   setIsProcessing(true);

//   try {
//     const response = await axios.post('https://your-api-url.com/submit', {
//       problemId: problem?.id,
//       language,
//       code,
//     });

//     const data = response.data;

//     toast({
//       title: "Success!",
//       description: "Your solution passed all test cases!",
//     });
//   } catch (error: any) {
//     const message =
//       error.response?.data?.message || "Something went wrong. Try again later.";

//     toast({
//       title: "Error",
//       description: message,
//       variant: "destructive",
//     });
//   } finally {
//     setIsProcessing(false);
//   }
// };
