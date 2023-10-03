"use client";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Header from "@/components/shared/Header";
import { ArrowBottomRightIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ethers } from "ethers";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

declare global {
  interface Window {
    ethereum: any;
  }
}

export default function Home() {
  const formSchema = z.object({
    amount: z.number().min(2, {
      message: "Amount should be required",
    }),
    walletAddress: z.string().min(2, {
      message: "Wallet Address should be required",
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      walletAddress: "",
    },
  });
  const errors = form.formState.errors;
  const [loader, setLoader] = useState<boolean>(false);
  const [message, setMessage] = useState<String>("");
  const [transaction, setTransaction] = useState<ethers.providers.TransactionResponse | null >(null);
  const {toast} = useToast()
  const StartPayment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoader(true);
    const formValues = form.getValues();
    console.log(formValues);
    try {
      if (!window.ethereum) {
        throw new Error("No crypto wallet found. Please install it.");
      }
      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const network = await provider.getNetwork();
      if (!network.ensAddress) {
        throw new Error("Network does not support ENS. Change to required");
      }
      const transactionResponse = await signer.sendTransaction({
        to:  formValues.walletAddress,
        value:  ethers.utils.parseEther(formValues.amount.toString())
      });
  
      console.log({transactionResponse});
      setTransaction(transactionResponse);
      console.log(transactionResponse)
      setLoader(false);
      setMessage("Transaction was successfully completed");
      toast({
        title: "Complex",
        description: message,
      });
      form.setValue("amount", 0);
      form.setValue("walletAddress", "");
    } catch (error: any) {
      console.log({ error });
      setLoader(false);
      setMessage(error.message ?? "Transaction was not completed");
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>
      })
    } finally {
      setLoader(false);
      setMessage("");
    }
  };
  return (
    <main>
      <Header />
      <section className="flex flex-col md:flex-row justify-between items-center py-24 px-4 lg:px-20">
        <div>
          <div className="flex flex-row gap-x-4">
            <Image
              src="/assets/logo.png"
              alt="Myvtial"
              width={24}
              height={32}
            />
            <span className="font-extrabold text-primary text-xl inline-flex gap-x-4">
              Jump Start your portofolio{" "}
              <span>
                <ArrowBottomRightIcon style={{ fontSize: 32 }} />
              </span>
            </span>
          </div>
          <div className="max-w-[50vw]  my-4">
            <h1 className="lg:text-8xl text-2xl font-semibold">
              Jump start your crypto testing!
            </h1>
            <p className="py-10">
              Are you ready to dive into the exciting world of cryptocurrencies
              but don't know where to start? Look no further! Our Crypto Testing
              Accelerator is here to supercharge your crypto testing journey and
              help you gain hands-on experience with digital assets, blockchain
              technology, and decentralized finance (DeFi) platforms.
            </p>
          </div>
          <div>
            <Button className="border-2 flex flex-row gap-x-6 bg-transparent text-primary border-primary p-10 rounded-full ">
              <GitHubLogoIcon fontSize={20}/>
              <span className="font-bold">Explore On Github</span>
            </Button>
          </div>
        </div>
        <div className="bg-black/2 shadow-lg mt-6 md:mt-0 min-w-[30vw] py-6 px-6 h-1/2">
          <Form {...form}>
            <form method="POST" onSubmit={StartPayment} className="space-y-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className={`py-6 border focus:border-primary ${
                          errors.amount ? "border-red-500" : ""
                        }`}
                        placeholder="USD"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the desired public amount in USD.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="walletAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wallet Address</FormLabel>
                    <FormControl>
                      <Input
                        className={`py-6 border focus:border-primary ${
                          errors.walletAddress ? "border-red-500" : ""
                        }`}
                        placeholder=""
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the desired public wallet address.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="bg-primary font-semibold py-6 w-full my-6 hover:bg-indigo-500"
              >
                {loader ? (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <span>Continue the transaction</span>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </main>
  );
}
