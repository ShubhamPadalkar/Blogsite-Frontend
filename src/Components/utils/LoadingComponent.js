import { CircleLoader } from "react-spinners";



const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

const LoadingComponent = () => {
  return <CircleLoader 
            color='red' 
            loading={true} 
            cssOverride={override}
            />
}

export default LoadingComponent