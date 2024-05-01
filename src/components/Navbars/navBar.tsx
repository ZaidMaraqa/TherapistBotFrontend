import { Flex, Text, IconButton, Tooltip, Select } from "@chakra-ui/react";
import { MdLanguage } from "react-icons/md";  
import { useLocale } from 'next-intl';  
import { ChangeEvent, useTransition } from 'react';
import { useRouter } from "next/navigation";

export default function NavBar() {
    const [isPending, startTransition] = useTransition();
    const localeActive = useLocale();
    const router = useRouter();



    const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const nextLocale = e.target.value;
        startTransition(() => {
            window.location.pathname = `/${nextLocale}` + window.location.pathname.substr(3);
        });
      };
    

    return (
        <Flex justifyContent="space-between" alignItems="center" p="1rem" w={'100%'}>
            <Text
                fontSize={"2.5rem"}
                fontWeight={"bold"}
                color={"#231E5B"}
            >
                ECHO
            </Text>
            <Select defaultValue={localeActive} onChange={onSelectChange} w={'fit-content'} >
                <option value='en'>English</option>
                <option value='ar'>عربي</option>
            </Select>
        </Flex>
    );
}
