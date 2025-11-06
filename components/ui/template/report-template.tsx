"use client";
import * as React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Svg,
  Path,
  Font,
} from "@react-pdf/renderer";
import { Providers } from "@/types/provider-details";
import { formatPhoneNumber } from "utils/converter";
import { formatAddressFromLocations } from "utils/converter";
import { TitleCase } from "utils/converter";

interface ReportTemplateProps {
  currentDateTime: string;
  savedProviderDetails: Providers[];
  logo: string;
  caretype: string;
}

const ReportTemplate: React.FC<ReportTemplateProps> = ({
  currentDateTime = "",
  savedProviderDetails = [],
  logo = "",
  caretype = "",
}) => {
  const resolvedCareType = caretype === "" ? "Skilled Nursing" : caretype;
  const pages = renderPaginatedPages(
    savedProviderDetails,
    resolvedCareType,
    currentDateTime,
    logo
  );
  return <Document>{pages}</Document>;
};

export default ReportTemplate;

const renderPaginatedPages = (
  providers: Providers[],
  caretype: string,
  currentDateTime: string,
  logo: string
) => {
  const pages = [];
  let index = 0;

  while (index < providers.length) {
    const currentSlice = providers.slice(index, index + 4);
    pages.push(
      <Page key={`page-${index}`} style={styles.page}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              src={logo}
              style={{ width: "50px", height: "50px", objectFit: "contain" }}
            />
            <View style={styles.headerRight}>
              <Text style={styles.headerDate}>{currentDateTime}</Text>
            </View>
          </View>
          {currentSlice.map((provider, i) => {
            const isLastInPage = i === currentSlice.length - 1;
            const hasImage = "";

            return (
              <View
                key={provider.code}
                style={[
                  styles.listcontainer,
                  ...(isLastInPage ? [{ borderBottom: "none" }] : []),
                ]}
              >
                <View style={styles.providerCard}>
                  <View style={styles.imageContainer}>
                    {hasImage ? (
                      <Image src={hasImage} style={styles.providerImage} />
                    ) : (
                      <View style={styles.imagePlaceholder}>
                        <Svg style={styles.placeholderIcon} viewBox="0 0 24 24">
                          <Path
                            d="M12 4.5V6M12 6V7.5M12 6H13.5M12 6H10.5"
                            stroke="#9CA3AF"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            fill="none"
                          />
                          <Path
                            d="M8.58579 2.58579C8 3.17157 8 4.11438 8 6C8 7.88562 8 8.82843 8.58579 9.41421C9.17157 10 10.1144 10 12 10C13.8856 10 14.8284 10 15.4142 9.41421C16 8.82843 16 7.88562 16 6C16 4.11438 16 3.17157 15.4142 2.58579C14.8284 2 13.8856 2 12 2C10.1144 2 9.17157 2 8.58579 2.58579Z"
                            stroke="#9CA3AF"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                          <Path
                            d="M4 22V11.9707C4 8.66123 4 7.00649 5.02513 5.97836C5.67665 5.32493 6.58055 5.08679 8 5M20 22V11.9707C20 8.66123 20 7.00649 18.9749 5.97836C18.3233 5.32493 17.4194 5.08679 16 5"
                            stroke="#9CA3AF"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                          <Path
                            d="M3 22H21"
                            stroke="#9CA3AF"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                          <Path
                            d="M9.5 22V19.5C9.5 18.5654 9.5 18.0981 9.70096 17.75C9.83261 17.522 10.022 17.3326 10.25 17.201C10.5981 17 11.0654 17 12 17C12.9346 17 13.4019 17 13.75 17.201C13.978 17.3326 14.1674 17.522 14.299 17.75C14.5 18.0981 14.5 18.5654 14.5 19.5V22"
                            stroke="#9CA3AF"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            fill="none"
                          />
                          <Path
                            d="M8.00896 13H8M12 13H11.991M16.0011 13H15.9922"
                            stroke="#9CA3AF"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </Svg>
                      </View>
                    )}
                  </View>

                  <View style={styles.providerContent}>
                    <Text style={styles.providerHeader}>
                      {TitleCase(provider.name)}
                    </Text>

                    <View style={styles.lstCategoryContainer}>
                      <View style={styles.lstCategoryMark}></View>
                      <Text style={styles.lstCategory}>
                        {provider.services.find(
                          (service) => service === caretype
                        ) ?? provider.services[0]}
                      </Text>
                    </View>

                    <View style={styles.infoGrid}>
                      <View style={styles.infoGridRow}>
                        <View style={styles.infoGridItem}>
                          <View style={styles.infoItemRow}>
                            <Svg style={styles.infoIcon} viewBox="0 0 24 24">
                              <Path
                                d="M13.6177 21.367C13.1841 21.773 12.6044 22 12.0011 22C11.3978 22 10.8182 21.773 10.3845 21.367C6.41302 17.626 1.09076 13.4469 3.68627 7.37966C5.08963 4.09916 8.45834 2 12.0011 2C15.5439 2 18.9126 4.09916 20.316 7.37966C22.9082 13.4393 17.599 17.6389 13.6177 21.367Z"
                                stroke="#6B7280"
                                strokeWidth={1.5}
                                fill="none"
                              />
                              <Path
                                d="M15.5 11C15.5 12.933 13.933 14.5 12 14.5C10.067 14.5 8.5 12.933 8.5 11C8.5 9.067 10.067 7.5 12 7.5C13.933 7.5 15.5 9.067 15.5 11Z"
                                stroke="#6B7280"
                                strokeWidth={1.5}
                                fill="none"
                              />
                            </Svg>
                            <View style={styles.infoTextWrapper}>
                              <Text style={styles.infoLabel}>Address</Text>
                              <Text style={styles.infoValue}>
                                {provider.locations &&
                                provider.locations.length > 0
                                  ? formatAddressFromLocations(
                                      provider.locations
                                    )
                                  : "-"}
                              </Text>
                            </View>
                          </View>
                        </View>

                        <View style={styles.infoGridItem}>
                          <View style={styles.infoItemRow}>
                            <Svg style={styles.infoIcon} viewBox="0 0 24 24">
                              <Path
                                d="M9.09133 5.05585L8.83808 4.48602C8.49695 3.71848 8.32638 3.33471 8.04568 3.06345C7.8604 2.88439 7.64236 2.74269 7.40348 2.64609C7.04159 2.49976 6.62162 2.49976 5.78169 2.49976C4.53103 2.49976 3.90571 2.49976 3.41849 2.80339C3.11966 2.98961 2.83386 3.30577 2.67865 3.62181C2.42557 4.13711 2.48298 4.70483 2.5978 5.84027C3.55053 15.2621 8.7378 20.4493 18.1596 21.4021C19.295 21.5169 19.8628 21.5743 20.3781 21.3212C20.6941 21.166 21.0103 20.8802 21.1965 20.5814C21.5001 20.0942 21.5001 19.4688 21.5001 18.2182C21.5001 17.3783 21.5001 16.9583 21.3538 16.5964C21.2572 16.3575 21.1155 16.1395 20.9364 15.9542C20.6652 15.6735 20.2814 15.5029 19.5139 15.1618L18.944 14.9085C18.2715 14.6096 17.9352 14.4602 17.5979 14.4318C17.2391 14.4016 16.8787 14.4685 16.5547 14.6255C16.25 14.7731 15.9898 15.0333 15.4694 15.5537C14.9574 16.0657 14.7014 16.3217 14.368 16.4724C14.0436 16.6191 13.5877 16.6815 13.2358 16.6273C12.8742 16.5716 12.6084 16.4217 12.0768 16.1219C10.1923 15.059 8.94086 13.8075 7.87799 11.9231C7.57818 11.3915 7.42827 11.1257 7.37257 10.7641C7.31837 10.4122 7.38073 9.95626 7.52743 9.63184C7.67819 9.29845 7.93418 9.04245 8.44618 8.53046C8.96659 8.01004 9.2268 7.74984 9.37439 7.44518C9.53139 7.12113 9.59829 6.7608 9.56809 6.40199C9.5397 6.06467 9.39024 5.72839 9.09133 5.05585Z"
                                stroke="#6B7280"
                                strokeWidth={1.5}
                                fill="none"
                              />
                            </Svg>
                            <View style={styles.infoTextWrapper}>
                              <Text style={styles.infoLabel}>Phone</Text>
                              <Text style={styles.infoValue}>
                                {provider.phone && provider.phone !== ""
                                  ? formatPhoneNumber(provider.phone)
                                  : "-"}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>

                      <View style={styles.infoGridRow}>
                        <View style={styles.infoGridItem}>
                          <View style={styles.infoItemRow}>
                            <Svg style={styles.infoIcon} viewBox="0 0 24 24">
                              <Path
                                d="M21 3L3 8.14286L12.0012 12L15.8588 21L21 3Z"
                                stroke="#6B7280"
                                strokeWidth={1.5}
                                fill="none"
                              />
                            </Svg>
                            <View style={styles.infoTextWrapper}>
                              <Text style={styles.infoLabel}>Distance</Text>
                              <Text style={styles.infoValue}>
                                {provider.distanceInMiles &&
                                provider.distanceInMiles !== 0
                                  ? `${provider.distanceInMiles} miles away`
                                  : "-"}
                              </Text>
                            </View>
                          </View>
                        </View>

                        <View style={styles.infoGridItem}>
                          <View style={styles.infoItemRow}>
                            <Svg style={styles.infoIcon} viewBox="0 0 24 24">
                              <Path
                                d="M11.109 3.74829C11.48 3.02037 12.52 3.02037 12.891 3.74829L15.0785 8.0407C15.2237 8.32561 15.4964 8.5239 15.8122 8.5742L20.5671 9.33147C21.373 9.45983 21.6941 10.4474 21.1178 11.0252L17.7138 14.4383C17.4883 14.6644 17.3844 14.9846 17.4341 15.3001L18.1843 20.0635C18.3114 20.8702 17.4703 21.4808 16.7426 21.1102L12.4539 18.9254C12.1687 18.7801 11.8313 18.7801 11.5461 18.9254L7.25739 21.1102C6.52973 21.4808 5.68859 20.8702 5.81565 20.0635L6.56594 15.3001C6.61562 14.9846 6.51167 14.6644 6.28617 14.4383L2.88217 11.0252C2.3059 10.4474 2.62703 9.45983 3.43294 9.33147L8.18782 8.5742C8.50362 8.5239 8.77632 8.32561 8.92151 8.0407L11.109 3.74829Z"
                                stroke="#6B7280"
                                strokeWidth={1.5}
                                fill="none"
                              />
                            </Svg>
                            <View style={styles.infoTextWrapper}>
                              <Text style={styles.infoLabel}>Rating</Text>
                              <View style={styles.ratingRow}>
                                <View style={styles.ratingContainer}>
                                  {[...Array(5)].map((_, index) => {
                                    const isFilled =
                                      index < (provider.rating?.overall || 0);
                                    return (
                                      <Svg
                                        key={index}
                                        style={styles.ratingIcon}
                                        viewBox="0 0 24 24"
                                      >
                                        <Path
                                          d="M11.109 3.74829C11.48 3.02037 12.52 3.02037 12.891 3.74829L15.0785 8.0407C15.2237 8.32561 15.4964 8.5239 15.8122 8.5742L20.5671 9.33147C21.373 9.45983 21.6941 10.4474 21.1178 11.0252L17.7138 14.4383C17.4883 14.6644 17.3844 14.9846 17.4341 15.3001L18.1843 20.0635C18.3114 20.8702 17.4703 21.4808 16.7426 21.1102L12.4539 18.9254C12.1687 18.7801 11.8313 18.7801 11.5461 18.9254L7.25739 21.1102C6.52973 21.4808 5.68859 20.8702 5.81565 20.0635L6.56594 15.3001C6.61562 14.9846 6.51167 14.6644 6.28617 14.4383L2.88217 11.0252C2.3059 10.4474 2.62703 9.45983 3.43294 9.33147L8.18782 8.5742C8.50362 8.5239 8.77632 8.32561 8.92151 8.0407L11.109 3.74829Z"
                                          fill={isFilled ? "#FBBF24" : "none"}
                                          stroke="#FBBF24"
                                          strokeWidth={1.5}
                                          strokeLinejoin="round"
                                        />
                                      </Svg>
                                    );
                                  })}
                                </View>
                                <Text style={styles.ratingText}>
                                  ({provider.rating?.overall || 0}.0 Rating)
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Generated on {currentDateTime} | Spot Care Provider Wishlist
              Report
            </Text>
            <View style={styles.pageNumber}>
              <Text style={styles.footerText}>Page: </Text>
              <Text style={styles.footerPageNum}>{index / 4 + 1}</Text>
            </View>
          </View>
        </View>
      </Page>
    );

    index += 4;
  }

  return pages;
};

Font.register({
  family: "Improva",
  fonts: [
    { src: "/fonts/ttf/Improva-Light.ttf", fontWeight: 300 },
    { src: "/fonts/ttf/Improva-Regular.ttf", fontWeight: 400 },
    { src: "/fonts/ttf/Improva-Medium.ttf", fontWeight: 500 },
    { src: "/fonts/ttf/Improva-Bold.ttf", fontWeight: 700 },
    { src: "/fonts/ttf/Improva-ExtraBold.ttf", fontWeight: 900 },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: "20px 20px 0px 20px",
    position: "relative",
    backgroundColor: "#F9FAFB",
  },
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#FFF",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingBottom: "40px",
    borderRadius: "8px",
    border: "1px solid #E5E7EB",
  },
  listcontainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    borderBottom: "1px solid #E5E7EB",
    padding: "16px 20px",
  },
  providerCard: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: "16px",
  },
  imageContainer: {
    width: "100px",
    height: "100px",
    flexShrink: 0,
  },
  providerImage: {
    width: "100%",
    height: "100%",
    borderRadius: "8px",
    objectFit: "cover",
  },
  imagePlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F3F4F6",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #E5E7EB",
  },
  placeholderIcon: {
    width: "40px",
    height: "40px",
    alignSelf: "center",
  },
  providerContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  providerHeader: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: "14px",
    lineHeight: 1.3,
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "2px solid #4F46E5",
    padding: "15px 20px",
  },
  headerRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "2px",
  },
  headerDate: {
    fontSize: "9px",
    color: "#6B7280",
  },
  headerTitle: {
    fontSize: "12px",
    fontWeight: "bold",
    color: "#111827",
    letterSpacing: "0.5px",
  },
  lstCategoryContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    padding: "4px 10px",
    gap: "4px",
    borderRadius: "12px",
    backgroundColor: "#DCFCE7",
  },
  lstCategoryMark: {
    width: "4px",
    height: "4px",
    backgroundColor: "#16A34A",
    borderRadius: "2px",
  },
  lstCategory: {
    fontSize: "8px",
    color: "#166534",
    fontWeight: 600,
  },
  ratingRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "4px",
  },
  ratingContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "2px",
  },
  ratingIcon: {
    width: "10px",
    height: "10px",
  },
  ratingText: {
    fontSize: "8px",
    color: "#6B7280",
  },
  infoGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%",
  },
  infoGridRow: {
    display: "flex",
    flexDirection: "row",
    gap: "16px",
    width: "100%",
  },
  infoGridItem: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
  },
  infoItemRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "6px",
    width: "100%",
  },
  infoIcon: {
    width: "12px",
    height: "12px",
    flexShrink: 0,
  },
  infoTextWrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  infoLabel: {
    fontSize: "9px",
    color: "#6B7280",
    fontWeight: "600",
  },
  infoValue: {
    fontSize: "9px",
    color: "#000000",
    lineHeight: 1.3,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTop: "1px solid #E5E7EB",
    padding: "12px 20px",
    backgroundColor: "#FFF",
  },
  footerText: {
    fontSize: "8px",
    color: "#6B7280",
  },
  pageNumber: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "2px",
  },
  footerPageNum: {
    fontSize: "8px",
    color: "#111827",
    fontWeight: "600",
  },
});