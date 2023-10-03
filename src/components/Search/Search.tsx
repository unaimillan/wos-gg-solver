import { Container, Flex, Slider, Table, TextInput, Text, Code } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import words from "../../utils/words.txt?raw"
import _ from "lodash";

export function Search() {
    const [search, setSearch] = useDebouncedState<string>("", 300);
    const [letterCount, setLetterCount] = useDebouncedState<number>(4, 300);

    const preparedWords = words.split('\n')

    // const fuseWords = fuse.search(search, {limit:15}).map(v => v.item)
    const letters = _.countBy(search, l=>l)

    const regexPattern = `^[${search.replaceAll('.', '\\.')}]{${letterCount}}$`
    const regex = new RegExp(regexPattern)
    const filteredWords = preparedWords
        .filter(cand => cand.length == letterCount && regex.test(cand) && _.map(_.countBy(cand, l=>l), (k, v) => k <= letters[v]).every(Boolean)).slice(0, 50)

    const rows = filteredWords.map(word => (
        <Table.Tr key={word}>
            <Table.Td>{word.length}</Table.Td>
            <Table.Td>{word}</Table.Td>
        </Table.Tr>
    ))
    return (
        <Container>
            <Flex mt="lg" direction="column" justify="center" gap="lg">
                <Text>Enter letters and select length</Text>
                <TextInput defaultValue={search} onChange={e => setSearch(e.target.value)} />
                <Slider
                    defaultValue={letterCount}
                    min={2}
                    max={12}
                    step={1}
                    marks={[...Array(11).keys()].map(v => ({ label: (v + 2).toString(), value: (v + 2) }))}
                    onChange={setLetterCount}
                />
                <Text>
                    Regex: <Text c="blue" component="span">{regexPattern}</Text>,
                    letters count: <Text c="blue" component="span">{"{" + _.map(letters, (k, v) => ` ${v}: ${k}`) + " }"}</Text>
                </Text>
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Length</Table.Th>
                            <Table.Th>Word</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {rows}
                    </Table.Tbody>
                </Table>
            </Flex>
        </Container>
    );
}
