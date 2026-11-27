# High-Fidelity screen inventory

The page contains 116 visible product screens, five logo states and one hidden personal dashboard. The frame embedded inside the map is a child layer. The earlier catalog included standalone share and rectangle assets, and omitted actual community screens.

The Expo Web comparison and a scenario for each of the 121 frames are in [SCREEN_CHECKS.csv](SCREEN_CHECKS.csv) and [the screenshot album](VISUAL_REVIEW.pdf). The device column below tracks physical Expo Go acceptance.

The node link opens the source frame. The component link opens its native composition. Layer counts cover rendered text, imagery and surfaces. Navigation counts cover the authored tap targets captured in the implementation. Business data and system chrome can change the rendered state.

| Group | Frame and Figma reference | Native route and component | Layers | Tap targets | Device acceptance |
|---|---|---|---:|---:|---|
| Community | [01_UI_Community_Feed](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=101-2769) | [101:2769](../../src/features/design/screens/Frame01UiCommunityFeedScreen.tsx) | 60 | 9 | Pending |
| Community | [02_UI_Post_Details](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=105-2895) | [105:2895](../../src/features/design/screens/Frame02UiPostDetailsScreen.tsx) | 41 | 1 | Pending |
| Community | [03_UI_Create_Post](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=115-422) | [115:422](../../src/features/design/screens/Frame03UiCreatePostScreen.tsx) | 43 | 2 | Pending |
| Community | [05_UI_Groups_Organizations](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=115-2686) | [115:2686](../../src/features/design/screens/Frame05UiGroupsOrganizationsScreen.tsx) | 56 | 2 | Pending |
| Community | [06_UI_Organization_Detail](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=119-3037) | [119:3037](../../src/features/design/screens/Frame06UiOrganizationDetailScreen.tsx) | 58 | 4 | Pending |
| Community | [04_UI_Search_Results](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=666-2965) | [666:2965](../../src/features/design/screens/Frame04UiSearchResultsScreen.tsx) | 67 | 2 | Pending |
| Community | [09_UI_Share_Activity](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=666-3173) | [666:3173](../../src/features/design/screens/Frame09UiShareActivityScreen.tsx) | 46 | 3 | Pending |
| Community | [07_UI_Organization_Members](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=666-3366) | [666:3366](../../src/features/design/screens/Frame07UiOrganizationMembersScreen.tsx) | 68 | 2 | Pending |
| Community | [08_UI_Public_Profile](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=666-4125) | [666:4125](../../src/features/design/screens/Frame08UiPublicProfileScreen.tsx) | 50 | 1 | Pending |
| Profile & Gamification | [12_UI_Achievements_Badges](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=218-2549) | [218:2549](../../src/features/design/screens/Frame12UiAchievementsBadgesScreen.tsx) | 66 | 2 | Pending |
| Profile & Gamification | [14_UI_Leaderboard](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=238-299) | [238:299](../../src/features/design/screens/Frame14UiLeaderboardScreen.tsx) | 85 | 2 | Pending |
| Profile & Gamification | [16_UI_Levels_Rewards](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=240-442) | [240:442](../../src/features/design/screens/Frame16UiLevelsRewardsScreen.tsx) | 63 | 2 | Pending |
| Profile & Gamification | [15_UI_Points_History](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=263-2756) | [263:2756](../../src/features/design/screens/Frame15UiPointsHistoryScreen.tsx) | 35 | 1 | Pending |
| Profile & Gamification | [11_UI_Edit_Profile](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=666-4366) | [666:4366](../../src/features/design/screens/Frame11UiEditProfileScreen.tsx) | 37 | 2 | Pending |
| Profile & Gamification | [10_UI_My_Profile_Eco_Impact](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=666-3592) | [666:3592](../../src/features/design/screens/Frame10UiMyProfileEcoImpactScreen.tsx) | 152 | 17 | Pending |
| Profile & Gamification | [13_UI_Badge_Details](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=670-4529) | [670:4529](../../src/features/design/screens/Frame13UiBadgeDetailsScreen.tsx) | 55 | 1 | Pending |
| Profile & Gamification | [17_UI_Redeem_Reward](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=670-4692) | [670:4692](../../src/features/design/screens/Frame17UiRedeemRewardScreen.tsx) | 32 | 2 | Pending |
| Profile & Gamification | [18_UI_Daily_Mission](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=670-5000) | [670:5000](../../src/features/design/screens/Frame18UiDailyMissionScreen.tsx) | 62 | 1 | Pending |
| Profile & Gamification | [19_UI_Level_Up](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=670-5193) | [670:5193](../../src/features/design/screens/Frame19UiLevelUpScreen.tsx) | 48 | 3 | Pending |
| Knowledge | [20_UI_Knowledge_Hub](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=244-550) | [244:550](../../src/features/design/screens/Frame20UiKnowledgeHubScreen.tsx) | 46 | 6 | Pending |
| Knowledge | [21_UI_Waste_Sorting_Guide](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=263-2582) | [263:2582](../../src/features/design/screens/Frame21UiWasteSortingGuideScreen.tsx) | 52 | 3 | Pending |
| Knowledge | [22_UI_Waste_Item_Detail](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=269-124) | [269:124](../../src/features/design/screens/Frame22UiWasteItemDetailScreen.tsx) | 40 | 1 | Pending |
| Knowledge | [23_UI_Species_Library](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=272-204) | [272:204](../../src/features/design/screens/Frame23UiSpeciesLibraryScreen.tsx) | 43 | 3 | Pending |
| Knowledge | [24_UI_Species_Detail](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=274-297) | [274:297](../../src/features/design/screens/Frame24UiSpeciesDetailScreen.tsx) | 43 | 2 | Pending |
| Knowledge | [25_UI_Green_Living_Tips](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=682-5379) | [682:5379](../../src/features/design/screens/Frame25UiGreenLivingTipsScreen.tsx) | 54 | 3 | Pending |
| Knowledge | [26_UI_Guide_Detail](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=682-5569) | [682:5569](../../src/features/design/screens/Frame26UiGuideDetailScreen.tsx) | 44 | 2 | Pending |
| Knowledge | [27_UI_Sorting_Quiz](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=682-5716) | [682:5716](../../src/features/design/screens/Frame27UiSortingQuizScreen.tsx) | 35 | 1 | Pending |
| User Flow | [Events Search Filter](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=258-516) | [258:516](../../src/features/design/screens/EventsSearchFilterScreen.tsx) | 92 | 2 | Pending |
| User Flow | [Event Calendar](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=258-614) | [258:614](../../src/features/design/screens/EventCalendarScreen.tsx) | 93 | 2 | Pending |
| User Flow | [Event Detail](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=258-735) | [258:735](../../src/features/design/screens/EventDetailScreen.tsx) | 29 | 2 | Pending |
| User Flow | [Event Registration](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=258-792) | [258:792](../../src/features/design/screens/EventRegistrationScreen.tsx) | 26 | 2 | Pending |
| User Flow | [Event Checklist](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=258-842) | [258:842](../../src/features/design/screens/EventChecklistScreen.tsx) | 38 | 3 | Pending |
| User Flow | [My Event](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=258-906) | [258:906](../../src/features/design/screens/MyEventScreen.tsx) | 32 | 3 | Pending |
| User Flow | [Event Group Chat](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=258-1078) | [258:1078](../../src/features/design/screens/EventGroupChatScreen.tsx) | 26 | 1 | Pending |
| User Flow | [Event Check-in](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=258-1135) | [258:1135](../../src/features/design/screens/EventCheckInScreen.tsx) | 14 | 2 | Pending |
| User Flow | [Event Check-in Completed](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=258-1177) | [258:1177](../../src/features/design/screens/EventCheckInCompletedScreen.tsx) | 22 | 2 | Pending |
| User Flow | [Event Certificate](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=258-1450) | [258:1450](../../src/features/design/screens/EventCertificateScreen.tsx) | 26 | 1 | Pending |
| User Flow | [Event Feedback](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=258-1500) | [258:1500](../../src/features/design/screens/EventFeedbackScreen.tsx) | 32 | 1 | Pending |
| User Flow | [Events Home](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=258-426) | [258:426](../../src/features/design/screens/EventsHomeScreen.tsx) | 59 | 9 | Pending |
| User Flow | [Event Participants](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=258-978) | [258:978](../../src/features/design/screens/EventParticipantsScreen.tsx) | 55 | 3 | Pending |
| User Flow | [Event Recap](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1356-3049) | [1356:3049](../../src/features/design/screens/EventRecapScreen.tsx) | 39 | 3 | Pending |
| CTV Flow | [Create Event - Step 1](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=258-1226) | [258:1226](../../src/features/design/screens/CreateEventStep1Screen.tsx) | 26 | 2 | Pending |
| CTV Flow | [Create Event - Step 2](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=258-1279) | [258:1279](../../src/features/design/screens/CreateEventStep2Screen.tsx) | 27 | 2 | Pending |
| CTV Flow | [Create Event - Step 4](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=700-264) | [700:264](../../src/features/design/screens/CreateEventStep4Screen.tsx) | 34 | 2 | Pending |
| CTV Flow | [Event Manage](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=258-1389) | [258:1389](../../src/features/design/screens/EventManageScreen.tsx) | 38 | 4 | Pending |
| CTV Flow | [Event Home - CTV](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=564-290) | [564:290](../../src/features/design/screens/EventHomeCtvScreen.tsx) | 69 | 8 | Pending |
| CTV Flow | [Edit Event](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=564-441) | [564:441](../../src/features/design/screens/EditEventScreen.tsx) | 35 | 2 | Pending |
| CTV Flow | [Create Event - Step 3](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=708-684) | [708:684](../../src/features/design/screens/CreateEventStep3Screen.tsx) | 29 | 3 | Pending |
| CTV Flow | [Posting Event Recap](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1356-310) | [1356:310](../../src/features/design/screens/PostingEventRecapScreen.tsx) | 33 | 2 | Pending |
| CTV Flow | [Approve Participants](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1356-347) | [1356:347](../../src/features/design/screens/ApproveParticipantsScreen.tsx) | 79 | 1 | Pending |
| Data & Donate & Logo - 22 Screens | [Frame 1 - Personal Dashboard](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=311-353) | Hidden in source | 0 | 0 | Excluded |
| Data | [Frame 2 - Community Dashboard](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=311-488) | [311:488](../../src/features/design/screens/Frame2CommunityDashboardScreen.tsx) | 43 | 4 | Pending |
| Data | [Frame 8 - Heatmap Data Overview](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=311-1093) | [311:1093](../../src/features/design/screens/Frame8HeatmapDataOverviewScreen.tsx) | 28 | 2 | Pending |
| Data | [Frame 9 - Campaign Impact Stats](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=311-1159) | [311:1159](../../src/features/design/screens/Frame9CampaignImpactStatsScreen.tsx) | 37 | 1 | Pending |
| Data | [Frame 10 - Eco-Impact Metrics](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=311-1280) | [311:1280](../../src/features/design/screens/Frame10EcoImpactMetricsScreen.tsx) | 44 | 1 | Pending |
| Data | [Frame 11 - Eco History Log](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=311-1412) | [311:1412](../../src/features/design/screens/Frame11EcoHistoryLogScreen.tsx) | 44 | 1 | Pending |
| Data | [Frame 12 - Export & Share](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=311-1506) | [311:1506](../../src/features/design/screens/Frame12ExportShareScreen.tsx) | 44 | 1 | Pending |
| Data | [Frame 3 - Area Rankings](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=311-579) | [311:579](../../src/features/design/screens/Frame3AreaRankingsScreen.tsx) | 91 | 2 | Pending |
| Data | [Frame 4 - Time Trends Analytics](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=311-716) | [311:716](../../src/features/design/screens/Frame4TimeTrendsAnalyticsScreen.tsx) | 49 | 1 | Pending |
| Data | [Frame 5 - Waste Composition](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=311-771) | [311:771](../../src/features/design/screens/Frame5WasteCompositionScreen.tsx) | 31 | 1 | Pending |
| Data | [Frame 6 - Area Comparison](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=311-869) | [311:869](../../src/features/design/screens/Frame6AreaComparisonScreen.tsx) | 55 | 1 | Pending |
| Data | [Frame 7 - Area Details Metrics](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=311-942) | [311:942](../../src/features/design/screens/Frame7AreaDetailsMetricsScreen.tsx) | 65 | 5 | Pending |
| Donate | [D8 - Donation Certificate](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1581-1986) | [1581:1986](../../src/features/design/screens/D8DonationCertificateScreen.tsx) | 25 | 1 | Pending |
| Donate | [D7 - Donation History](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1581-1920) | [1581:1920](../../src/features/design/screens/D7DonationHistoryScreen.tsx) | 42 | 1 | Pending |
| Donate | [D6 - Impact Report](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1581-1860) | [1581:1860](../../src/features/design/screens/D6ImpactReportScreen.tsx) | 35 | 1 | Pending |
| Donate | [D4 - Donation Success](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1581-1764) | [1581:1764](../../src/features/design/screens/D4DonationSuccessScreen.tsx) | 18 | 3 | Pending |
| Donate | [D3 - Donation Confirmation](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1581-1711) | [1581:1711](../../src/features/design/screens/D3DonationConfirmationScreen.tsx) | 27 | 4 | Pending |
| Donate | [D1 - Donate](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1581-1601) | [1581:1601](../../src/features/design/screens/D1DonateScreen.tsx) | 30 | 2 | Pending |
| Donate | [D2 - Payment Method](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1581-1655) | [1581:1655](../../src/features/design/screens/D2PaymentMethodScreen.tsx) | 32 | 2 | Pending |
| Donate | [D5 - Campaign Updates](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1581-1806) | [1581:1806](../../src/features/design/screens/D5CampaignUpdatesScreen.tsx) | 28 | 2 | Pending |
| Donate | [Frame 2 - Campaign Detail](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1581-1458) | [1581:1458](../../src/features/design/screens/Frame2CampaignDetailScreen.tsx) | 25 | 4 | Pending |
| Donate | [Frame 1 - Fundraising Campaigns](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1581-1359) | [1581:1359](../../src/features/design/screens/Frame1FundraisingCampaignsScreen.tsx) | 52 | 4 | Pending |
| Donate | [Frame 3 - Top Donors](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1581-1516) | [1581:1516](../../src/features/design/screens/Frame3TopDonorsScreen.tsx) | 52 | 1 | Pending |
| Logo | [animated logo - 1](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=949-246) | [949:246](../../src/features/design/screens/AnimatedLogo1Screen.tsx) | 2 | 0 | Pending |
| Logo | [animated logo - 2](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=949-253) | [949:253](../../src/features/design/screens/AnimatedLogo2Screen.tsx) | 2 | 0 | Pending |
| Logo | [animated logo - 3](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=949-260) | [949:260](../../src/features/design/screens/AnimatedLogo3Screen.tsx) | 2 | 0 | Pending |
| Logo | [animated logo - 4](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=949-267) | [949:267](../../src/features/design/screens/AnimatedLogo4Screen.tsx) | 3 | 0 | Pending |
| Logo | [animated logo - 5](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=949-276) | [949:276](../../src/features/design/screens/AnimatedLogo5Screen.tsx) | 3 | 0 | Pending |
| Recycle type | [5. Pollution Waste Type](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=230-1285) | [230:1285](../../src/features/design/screens/Frame5PollutionWasteTypeScreen.tsx) | 36 | 2 | Pending |
| Recycle type | [4. Pollution Severity](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=230-1261) | [230:1261](../../src/features/design/screens/Frame4PollutionSeverityScreen.tsx) | 45 | 2 | Pending |
| Recycle type | [3. Pollution Select Location](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=230-1237) | [230:1237](../../src/features/design/screens/Frame3PollutionSelectLocationScreen.tsx) | 27 | 2 | Pending |
| Recycle type | [2. Pollution Add Photo](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=230-1213) | [230:1213](../../src/features/design/screens/Frame2PollutionAddPhotoScreen.tsx) | 33 | 2 | Pending |
| Recycle type | [6. Pollution More Detail](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=230-1333) | [230:1333](../../src/features/design/screens/Frame6PollutionMoreDetailScreen.tsx) | 28 | 2 | Pending |
| Recycle type | [8. Pollution Submitted](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=230-1402) | [230:1402](../../src/features/design/screens/Frame8PollutionSubmittedScreen.tsx) | 33 | 3 | Pending |
| Recycle type | [7. Pollution Review](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=230-1425) | [230:1425](../../src/features/design/screens/Frame7PollutionReviewScreen.tsx) | 49 | 2 | Pending |
| Recycle type | [16. Report Status Tracker](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1249-216) | [1249:216](../../src/features/design/screens/Frame16ReportStatusTrackerScreen.tsx) | 38 | 2 | Pending |
| Animal type | [11. Rare Species Type](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=230-2029) | [230:2029](../../src/features/design/screens/Frame11RareSpeciesTypeScreen.tsx) | 45 | 2 | Pending |
| Animal type | [13. Rare Species Review](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=230-2098) | [230:2098](../../src/features/design/screens/Frame13RareSpeciesReviewScreen.tsx) | 36 | 2 | Pending |
| Animal type | [12. Rare Species Location](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=230-2121) | [230:2121](../../src/features/design/screens/Frame12RareSpeciesLocationScreen.tsx) | 30 | 2 | Pending |
| Animal type | [10. Rare Species Photo](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=230-1356) | [230:1356](../../src/features/design/screens/Frame10RareSpeciesPhotoScreen.tsx) | 33 | 2 | Pending |
| Notification | [15. Notification Detail](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=230-2052) | [230:2052](../../src/features/design/screens/Frame15NotificationDetailScreen.tsx) | 34 | 2 | Pending |
| Notification | [14. Notification Inbox](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=230-2075) | [230:2075](../../src/features/design/screens/Frame14NotificationInboxScreen.tsx) | 40 | 2 | Pending |
| Notification | [9. My Report History](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=230-1379) | [230:1379](../../src/features/design/screens/Frame9MyReportHistoryScreen.tsx) | 44 | 3 | Pending |
| Main | [1. Report type](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=230-1093) | [230:1093](../../src/features/design/screens/Frame1ReportTypeScreen.tsx) | 34 | 8 | Pending |
| Edit type | [20. Report Resolved / Impact](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1253-517) | [1253:517](../../src/features/design/screens/Frame20ReportResolvedImpactScreen.tsx) | 39 | 1 | Pending |
| Edit type | [17. Edit Report](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1253-343) | [1253:343](../../src/features/design/screens/Frame17EditReportScreen.tsx) | 35 | 2 | Pending |
| Edit type | [19. Add Follow-up Evidence](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1253-427) | [1253:427](../../src/features/design/screens/Frame19AddFollowUpEvidenceScreen.tsx) | 33 | 2 | Pending |
| Map Flow | [Q - 20](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=403-2759) | [403:2759](../../src/features/design/screens/Q20Screen.tsx) | 52 | 10 | Pending |
| Map Flow | [Q - 3](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=292-3681) | [292:3681](../../src/features/design/screens/Q3Screen.tsx) | 38 | 1 | Pending |
| Map Flow | [Q - 2](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=292-3312) | [292:3312](../../src/features/design/screens/Q2Screen.tsx) | 108 | 1 | Pending |
| Map Flow | [Q - 7](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=292-3829) | [292:3829](../../src/features/design/screens/Q7Screen.tsx) | 96 | 1 | Pending |
| Map Flow | [Q - 21](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=403-2866) | [403:2866](../../src/features/design/screens/Q21Screen.tsx) | 68 | 12 | Pending |
| Map Flow | [Q - 31](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=562-828) | [562:828](../../src/features/design/screens/Q31Screen.tsx) | 24 | 2 | Pending |
| Map Flow | [Q - 22](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=403-3026) | [403:3026](../../src/features/design/screens/Q22Screen.tsx) | 39 | 1 | Pending |
| Map Flow | [Q - 45](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1358-343) | [1358:343](../../src/features/design/screens/Q45Screen.tsx) | 42 | 3 | Pending |
| Admin Flow | [Q - 15](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=292-4283) | [292:4283](../../src/features/design/screens/Q15Screen.tsx) | 47 | 1 | Pending |
| Admin Flow | [Q - 14](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=292-4198) | [292:4198](../../src/features/design/screens/Q14Screen.tsx) | 48 | 1 | Pending |
| Admin Flow | [Q - 10](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=292-4022) | [292:4022](../../src/features/design/screens/Q10Screen.tsx) | 39 | 4 | Pending |
| Admin Flow | [Q - 34](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=605-523) | [605:523](../../src/features/design/screens/Q34Screen.tsx) | 59 | 2 | Pending |
| Admin Flow | [Q - 35](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=614-766) | [614:766](../../src/features/design/screens/Q35Screen.tsx) | 80 | 1 | Pending |
| Admin Flow | [Q - 27](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=689-327) | [689:327](../../src/features/design/screens/Q27Screen.tsx) | 48 | 1 | Pending |
| Admin Flow | [Q - 28](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=689-426) | [689:426](../../src/features/design/screens/Q28Screen.tsx) | 53 | 1 | Pending |
| Admin Flow | [Q - 36](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=692-477) | [692:477](../../src/features/design/screens/Q36Screen.tsx) | 120 | 1 | Pending |
| Admin Flow | [Q - 26](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=692-816) | [692:816](../../src/features/design/screens/Q26Screen.tsx) | 64 | 3 | Pending |
| Admin Flow | [Q - 37](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=722-6967) | [722:6967](../../src/features/design/screens/Q37Screen.tsx) | 53 | 5 | Pending |
| Section 1 | [Q - 38](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1335-4001) | [1335:4001](../../src/features/design/screens/Q38Screen.tsx) | 40 | 2 | Pending |
| Section 1 | [Q - 40](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1335-4104) | [1335:4104](../../src/features/design/screens/Q40Screen.tsx) | 39 | 1 | Pending |
| Section 1 | [Q - 39](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1335-4347) | [1335:4347](../../src/features/design/screens/Q39Screen.tsx) | 37 | 2 | Pending |
| Section 2 | [Q - 41](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1335-4216) | [1335:4216](../../src/features/design/screens/Q41Screen.tsx) | 47 | 1 | Pending |
| Section 2 | [Q - 42](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1335-4425) | [1335:4425](../../src/features/design/screens/Q42Screen.tsx) | 67 | 2 | Pending |
| Section 2 | [Q - 43](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1335-4572) | [1335:4572](../../src/features/design/screens/Q43Screen.tsx) | 85 | 2 | Pending |
| Section 2 | [Q - 44](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1335-4756) | [1335:4756](../../src/features/design/screens/Q44Screen.tsx) | 140 | 2 | Pending |

## Earlier catalog entries

The legacy list is kept for cross-reference. Only a matching visible product frame contributes to the screen total.

| Earlier entry | Source mapping |
|---|---|
| Q - 44 | [1335:4756](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1335-4756) |
| Q - 43 | [1335:4572](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1335-4572) |
| Q - 42 | [1335:4425](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1335-4425) |
| Q - 41 | [1335:4216](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1335-4216) |
| Q - 39 | [1335:4347](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1335-4347) |
| Q - 40 | [1335:4104](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1335-4104) |
| Q - 38 | [1335:4001](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1335-4001) |
| Q - 37 | [722:6967](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=722-6967) |
| Q - 26 | [692:816](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=692-816) |
| Q - 36 | [692:477](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=692-477) |
| Q - 28 | [689:426](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=689-426) |
| Q - 27 | [689:327](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=689-327) |
| Q - 35 | [614:766](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=614-766) |
| Q - 34 | [605:523](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=605-523) |
| Q - 10 | [292:4022](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=292-4022) |
| Q - 14 | [292:4198](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=292-4198) |
| Q - 15 | [292:4283](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=292-4283) |
| Q - 45 | [1358:343](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1358-343) |
| Q - 22 | [403:3026](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=403-3026) |
| Q - 31 | [562:828](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=562-828) |
| Q - 21 | [403:2866](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=403-2866) |
| Q - 7 | [292:3829](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=292-3829) |
| Q - 2 | [292:3312](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=292-3312) |
| Q - 3 | [292:3681](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=292-3681) |
| Q - 20 | [403:2759](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=403-2759) |
| 19. Add Follow-up Evidence | [1253:427](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1253-427) |
| 17. Edit Report | [1253:343](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1253-343) |
| 20. Report Resolved / Impact | [1253:517](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1253-517) |
| 1. Report type | [230:1093](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=230-1093) |
| 9. My Report History | [230:1379](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=230-1379) |
| 14. Notification Inbox | [230:2075](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=230-2075) |
| 15. Notification Detail | [230:2052](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=230-2052) |
| 10. Rare Species Photo | [230:1356](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=230-1356) |
| 12. Rare Species Location | [230:2121](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=230-2121) |
| 13. Rare Species Review | [230:2098](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=230-2098) |
| 11. Rare Species Type | [230:2029](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=230-2029) |
| 16. Report Status Tracker | [1249:216](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1249-216) |
| 7. Pollution Review | [230:1425](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=230-1425) |
| 8. Pollution Submitted | [230:1402](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=230-1402) |
| 6. Pollution More Detail | [230:1333](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=230-1333) |
| 2. Pollution Add Photo | [230:1213](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=230-1213) |
| 3. Pollution Select Location | [230:1237](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=230-1237) |
| 4. Pollution Severity | [230:1261](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=230-1261) |
| 5. Pollution Waste Type | [230:1285](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=230-1285) |
| Frame 3 - Top Donors | [1581:1516](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1581-1516) |
| Frame 1 - Fundraising Campaigns | [1581:1359](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1581-1359) |
| Frame 2 - Campaign Detail | [1581:1458](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1581-1458) |
| D5 - Campaign Updates | [1581:1806](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1581-1806) |
| D2 - Payment Method | [1581:1655](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1581-1655) |
| D1 - Donate | [1581:1601](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1581-1601) |
| D3 - Donation Confirmation | [1581:1711](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1581-1711) |
| D4 - Donation Success | [1581:1764](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1581-1764) |
| D6 - Impact Report | [1581:1860](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1581-1860) |
| D7 - Donation History | [1581:1920](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1581-1920) |
| D8 - Donation Certificate | [1581:1986](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1581-1986) |
| Frame 7 - Area Details Metrics | [311:942](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=311-942) |
| Frame 6 - Area Comparison | [311:869](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=311-869) |
| Frame 5 - Waste Composition | [311:771](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=311-771) |
| Frame 4 - Time Trends Analytics | [311:716](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=311-716) |
| Frame 3 - Area Rankings | [311:579](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=311-579) |
| Frame 12 - Export & Share | [311:1506](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=311-1506) |
| Frame 11 - Eco History Log | [311:1412](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=311-1412) |
| Frame 10 - Eco-Impact Metrics | [311:1280](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=311-1280) |
| Frame 9 - Campaign Impact Stats | [311:1159](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=311-1159) |
| Frame 8 - Heatmap Data Overview | [311:1093](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=311-1093) |
| Frame 2 - Community Dashboard | [311:488](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=311-488) |
| Approve Participants | [1356:347](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1356-347) |
| Posting Event Recap | [1356:310](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1356-310) |
| Create Event - Step 3 | [708:684](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=708-684) |
| Edit Event | [564:441](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=564-441) |
| Event Home - CTV | [564:290](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=564-290) |
| Event Manage | [258:1389](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=258-1389) |
| Create Event - Step 4 | [700:264](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=700-264) |
| Create Event - Step 2 | [258:1279](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=258-1279) |
| Create Event - Step 1 | [258:1226](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=258-1226) |
| Event Recap | [1356:3049](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=1356-3049) |
| Event Participants | [258:978](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=258-978) |
| Events Home | [258:426](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=258-426) |
| Event Feedback | [258:1500](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=258-1500) |
| Event Certificate | [258:1450](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=258-1450) |
| Event Check-in Completed | [258:1177](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=258-1177) |
| Event Check-in | [258:1135](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=258-1135) |
| Event Group Chat | [258:1078](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=258-1078) |
| My Event | [258:906](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=258-906) |
| Event Checklist | [258:842](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=258-842) |
| Event Registration | [258:792](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=258-792) |
| Event Detail | [258:735](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=258-735) |
| Event Calendar | [258:614](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=258-614) |
| Events Search Filter | [258:516](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=258-516) |
| Community | Section, asset, alias or app-only state. No exact screen-title match. |
| Profile & Gamification | Section, asset, alias or app-only state. No exact screen-title match. |
| Knowledge | Section, asset, alias or app-only state. No exact screen-title match. |
| share | Section, asset, alias or app-only state. No exact screen-title match. |
| Rectangle 792 | Section, asset, alias or app-only state. No exact screen-title match. |
| Rectangle 793 | Section, asset, alias or app-only state. No exact screen-title match. |
| Rectangle 794 | Section, asset, alias or app-only state. No exact screen-title match. |
| Rectangle 795 | Section, asset, alias or app-only state. No exact screen-title match. |
| Community Feed | [101:2769](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=101-2769) |
| Post Detail | [105:2895](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=105-2895) |
| Create Post | [115:422](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=115-422) |
| Comments | Section, asset, alias or app-only state. No exact screen-title match. |
| Likes | Section, asset, alias or app-only state. No exact screen-title match. |
| Leaderboard | [238:299](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=238-299) |
| Challenges | Section, asset, alias or app-only state. No exact screen-title match. |
| Challenge Detail | Section, asset, alias or app-only state. No exact screen-title match. |
| Badge Collection | [218:2549](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=218-2549) |
| Badge Detail | [670:4529](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=670-4529) |
| Points History | [263:2756](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=263-2756) |
| Rewards | [240:442](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=240-442) |
| Reward Detail | [670:4692](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=670-4692) |
| Notifications | Section, asset, alias or app-only state. No exact screen-title match. |
| Notification Settings | Section, asset, alias or app-only state. No exact screen-title match. |
| Account Settings | Section, asset, alias or app-only state. No exact screen-title match. |
| Help Center | Section, asset, alias or app-only state. No exact screen-title match. |
| About Ocean Project | Section, asset, alias or app-only state. No exact screen-title match. |
| Learning Quiz | [682:5716](https://www.figma.com/design/cyGGjt8PNXwgQi2v9k2u7B/Hoan---OP---Copilot-Code?node-id=682-5716) |
