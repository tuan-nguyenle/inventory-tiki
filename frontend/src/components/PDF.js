import React from 'react';
import { Document, View, Page, Text, Image, StyleSheet } from '@react-pdf/renderer';
import logo from "../assets/images/logo.jpg"
const styles = StyleSheet.create({
    page: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
        display: "flex",
    },
    title: {
        fontSize: 20,
        textAlign: "center",
    },
    text: {
        margin: 10,
        fontSize: 13,
        textAlign: "justify",
        fontFamily: "Times-Roman",
    },
    image: {
        width: "100px",
    },
    pageNumber: {
        position: "absolute",
        fontSize: 12,
        fontWeight: 700,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "grey"
    },
});
const PDF = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.text}>
                    <table>
                        <thead>
                            <tr>
                                <th>Qty</th>
                                <th>Product</th>
                                <th>Serial #</th>
                                <th>Description</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Call of Duty</td>
                                <td>455-981-221</td>
                                <td>El snort testosterone trophy driving gloves handsome</td>
                                <td>$64.50</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Need for Speed IV</td>
                                <td>247-925-726</td>
                                <td>Wes Anderson umami biodiesel</td>
                                <td>$50.00</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Monsters DVD</td>
                                <td>735-845-642</td>
                                <td>Terry Richardson helvetica tousled street art master</td>
                                <td>$10.70</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Grown Ups Blue Ray</td>
                                <td>422-568-642</td>
                                <td>Tousled lomo letterpress</td>
                                <td>$25.99</td>
                            </tr>
                        </tbody>
                    </table>
                </Text>
                <Text
                    style={styles.pageNumber}
                    render={({ pageNumber, totalPages }) => `${pageNumber}/ ${totalPages}`}
                    fixed
                />
            </View>
            <View style={styles.section2}>
                <Text>Section #2</Text>
            </View>
        </Page>
    </Document >
);
export default PDF;