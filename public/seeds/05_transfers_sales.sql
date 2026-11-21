BEGIN;
INSERT INTO transfers (id, reference, motorcycle_id, source_showroom_id, destination_showroom_id, status, reason, stock_age_at_request, approved_at, received_at, created_at)
VALUES ('f58728b8-2d8e-4bc6-ad94-0b2fe48b56b9', 'TRF-2026-0001', 'b9eef9fc-02db-4a09-a96c-8f7b423a150c', '81154d42-2237-4ddd-a95f-e70dd0795b96', '690a1d9c-3454-48a9-a855-d96d4ebcfc63', 'approved', 'Compte Global: Demande forte à Dar El Beïda pour stock dormant (99j à Oued Rhiou)', 99, '2026-11-19T14:48:55.983Z', NULL, '2026-11-18T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO transfers (id, reference, motorcycle_id, source_showroom_id, destination_showroom_id, status, reason, stock_age_at_request, approved_at, received_at, created_at)
VALUES ('c5633f40-187f-4c05-aaff-052a2580b351', 'TRF-2026-0002', 'b96feed4-af55-4873-ad5c-8d9b7d3119dd', '88d541ce-eb77-491b-ac5a-a72f9e548772', '37f82d93-cafd-4f41-af5f-1508b0b3b8f9', 'in_transit', 'Compte Global: Demande forte à Rouïba pour stock dormant (103j à Chéraga)', 103, '2026-11-16T14:48:55.983Z', NULL, '2026-11-15T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO transfers (id, reference, motorcycle_id, source_showroom_id, destination_showroom_id, status, reason, stock_age_at_request, approved_at, received_at, created_at)
VALUES ('47c95b2e-7006-4211-a393-b7958c6722b7', 'TRF-2026-0003', '6d0d6401-fb3e-4db4-ab1e-e5312b3863fd', 'e9de928b-17a6-44e6-ae14-0942fb6fa85c', '654a20b5-3c93-47e1-aa05-b9cb364e463f', 'received', 'Compte Global: Demande forte à Es-Senia pour stock dormant (107j à Bab El Oued)', 107, '2026-11-13T14:48:55.983Z', '2026-11-15T14:48:55.983Z', '2026-11-12T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO transfers (id, reference, motorcycle_id, source_showroom_id, destination_showroom_id, status, reason, stock_age_at_request, approved_at, received_at, created_at)
VALUES ('0adb9efc-5ed0-4dfe-a646-ca3c3e751eeb', 'TRF-2026-0004', '627c7012-5b03-44c3-a5c7-8bea7b366d25', 'c4ad5610-eefc-4d85-ab1b-be67e397aeb6', '256f8a1b-b5e7-4991-a728-02b869440477', 'rejected', 'Compte Global: Demande forte à Ali Mendjeli pour stock dormant (111j à Bir El Djir)', 111, '2026-11-10T14:48:55.983Z', NULL, '2026-11-09T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO transfers (id, reference, motorcycle_id, source_showroom_id, destination_showroom_id, status, reason, stock_age_at_request, approved_at, received_at, created_at)
VALUES ('3eb7a4db-2430-4c33-ae31-afe7de55ee50', 'TRF-2026-0005', '60d21271-2aa0-44fa-ac4b-2aa73be4d5d4', 'bc78aed8-b4b8-4716-abf9-2cd78cdb1660', 'c80536ee-471f-4432-ab52-27ba8d3143fe', 'pending', 'Compte Global: Demande forte à El Eulma pour stock dormant (115j à El Khroub)', 115, NULL, NULL, '2026-11-06T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO transfers (id, reference, motorcycle_id, source_showroom_id, destination_showroom_id, status, reason, stock_age_at_request, approved_at, received_at, created_at)
VALUES ('94355ca8-e341-4543-ad28-80326d321adb', 'TRF-2026-0006', '887fbff7-97e0-4d02-aac9-97398d8b25aa', '2f39d314-009b-4140-a754-d370518155e7', '318aa009-a953-4107-a027-41fc3e3379b1', 'approved', 'Compte Global: Demande forte à Ouled Yaïch pour stock dormant (119j à Aïn Oulmene)', 119, '2026-11-04T14:48:55.983Z', NULL, '2026-11-03T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO transfers (id, reference, motorcycle_id, source_showroom_id, destination_showroom_id, status, reason, stock_age_at_request, approved_at, received_at, created_at)
VALUES ('961adbfb-9f69-461c-a253-8b6a37a14cae', 'TRF-2026-0007', '0365d4b5-2da5-4572-aa80-694637ff1bc1', 'c13d2978-83d8-49b3-a4fe-93e92b1fc07f', 'd6c883f8-c7df-4b55-a711-25fcc9a5cb13', 'in_transit', 'Compte Global: Demande forte à Batna Ville pour stock dormant (123j à Tizi Ouzou)', 123, '2026-11-21T14:48:55.983Z', NULL, '2026-11-20T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO transfers (id, reference, motorcycle_id, source_showroom_id, destination_showroom_id, status, reason, stock_age_at_request, approved_at, received_at, created_at)
VALUES ('f39b7207-6b6f-410b-a8e1-bbac7b0b990d', 'TRF-2026-0008', '0c4eed66-3819-4c0e-a52d-05d5e8540f6f', '24c1efb6-43f6-41f9-a1ae-8602a4ffb00b', '6676117f-09a1-4fe6-ad91-c5be0787fe7a', 'received', 'Compte Global: Demande forte à Tlemcen Ville pour stock dormant (127j à Barika)', 127, '2026-11-18T14:48:55.983Z', '2026-11-20T14:48:55.983Z', '2026-11-17T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO transfers (id, reference, motorcycle_id, source_showroom_id, destination_showroom_id, status, reason, stock_age_at_request, approved_at, received_at, created_at)
VALUES ('0834e15d-4551-43b3-a2e7-9cf0cd14fb85', 'TRF-2026-0009', 'ea23f32f-30b5-4d91-a0c7-6b30f027ecde', '960b7501-9ca5-49cd-a5d2-2aec63e297cf', 'ced756da-4380-41b2-adad-65d1de43d461', 'rejected', 'Compte Global: Demande forte à Boumerdès pour stock dormant (131j à Maghnia)', 131, '2026-11-15T14:48:55.983Z', NULL, '2026-11-14T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO transfers (id, reference, motorcycle_id, source_showroom_id, destination_showroom_id, status, reason, stock_age_at_request, approved_at, received_at, created_at)
VALUES ('7818529b-9d1d-4a0f-acab-c600dcd74c21', 'TRF-2026-0010', 'fe521b25-5d8e-49ec-a8f4-1282c1a2e04f', '007d212c-d706-4db5-af1c-75bbf3eb35d9', 'b0d23458-9fde-4915-aa61-865751368634', 'pending', 'Compte Global: Demande forte à Bouira pour stock dormant (135j à Khemis El Khechna)', 135, NULL, NULL, '2026-11-11T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO transfers (id, reference, motorcycle_id, source_showroom_id, destination_showroom_id, status, reason, stock_age_at_request, approved_at, received_at, created_at)
VALUES ('4e23e75a-82fb-42ee-a7c0-b936a4ae4c8b', 'TRF-2026-0011', 'e363313a-2576-4663-ab49-3a67b0e999fa', 'd189e080-175c-4d64-ae46-cc884633d2f5', 'dafa8f2d-2471-4a5d-a0c6-24cd172fa668', 'approved', 'Compte Global: Demande forte à Djelfa pour stock dormant (139j à Lakhdaria)', 139, '2026-11-09T14:48:55.983Z', NULL, '2026-11-08T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO transfers (id, reference, motorcycle_id, source_showroom_id, destination_showroom_id, status, reason, stock_age_at_request, approved_at, received_at, created_at)
VALUES ('378e3b66-13ce-4d86-ad53-ed35078bd2f3', 'TRF-2026-0012', '0b5ca3ec-a901-4f64-aa0b-4529f513c8c0', '5e97063e-676f-49ad-a646-e1bd5f064dc9', '4123be06-d726-48d3-a1e9-880e315bb8ce', 'in_transit', 'Compte Global: Demande forte à M''Sila pour stock dormant (143j à Aïn Oussera)', 143, '2026-11-06T14:48:55.983Z', NULL, '2026-11-05T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO transfers (id, reference, motorcycle_id, source_showroom_id, destination_showroom_id, status, reason, stock_age_at_request, approved_at, received_at, created_at)
VALUES ('a9aa5d47-e499-4d34-ae1e-0cdc69a137a7', 'TRF-2026-0013', '5d4451b9-5a8d-462a-a07e-42458a3fec78', 'dad48ee7-3b7a-4648-a6dc-c78bfadf9c8d', 'fc0b2cc8-e9b0-4f8c-a488-cae893ac865a', 'received', 'Compte Global: Demande forte à Jijel pour stock dormant (147j à Boussaâda)', 147, '2026-11-03T14:48:55.983Z', '2026-11-05T14:48:55.983Z', '2026-11-02T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO transfers (id, reference, motorcycle_id, source_showroom_id, destination_showroom_id, status, reason, stock_age_at_request, approved_at, received_at, created_at)
VALUES ('20437e95-8775-435f-a165-fea6427a1f36', 'TRF-2026-0014', '7b0741d1-5f5a-4849-a77a-0c7bf63954c8', 'f7e49757-a156-4cae-ac34-3d95b3a5a07f', '6b9616e8-ee73-4bfb-ac35-3af33cfaa291', 'rejected', 'Compte Global: Demande forte à Médéa pour stock dormant (151j à Taher)', 151, '2026-11-20T14:48:55.983Z', NULL, '2026-11-19T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO transfers (id, reference, motorcycle_id, source_showroom_id, destination_showroom_id, status, reason, stock_age_at_request, approved_at, received_at, created_at)
VALUES ('6578e50c-7b7c-4ece-aa09-a1eaba4b13ae', 'TRF-2026-0015', '2eae861c-db0b-4be5-a7d8-8dd2846c7af4', 'b5999971-764e-4820-ac92-a9fcedac3ddd', '93560a52-18cc-4497-a06f-7ee7890b1c47', 'pending', 'Compte Global: Demande forte à Ouargla pour stock dormant (155j à Berrouaghia)', 155, NULL, NULL, '2026-11-16T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO transfers (id, reference, motorcycle_id, source_showroom_id, destination_showroom_id, status, reason, stock_age_at_request, approved_at, received_at, created_at)
VALUES ('7f8b3c67-75d2-47ae-a897-05e79764ed1f', 'TRF-2026-0016', 'bce8ed33-25e9-4fe7-a95d-a3d3d2216740', 'b424369f-e9ad-4839-a8e1-bd2baf669364', 'b5eb4bf2-7163-4399-aebe-cb7d68396a1f', 'approved', 'Compte Global: Demande forte à Sidi Bel Abbès pour stock dormant (159j à Hassi Messaoud)', 159, '2026-11-14T14:48:55.983Z', NULL, '2026-11-13T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO transfers (id, reference, motorcycle_id, source_showroom_id, destination_showroom_id, status, reason, stock_age_at_request, approved_at, received_at, created_at)
VALUES ('b0292b34-addf-4f67-a0d0-8e2a21190334', 'TRF-2026-0017', '47721ed5-d9d9-4f09-a42f-c7aa22326424', '706f9042-5247-4a7d-a617-8c2a3116d45d', '202c7f95-9694-4e2a-a7ca-8f72a327e96c', 'in_transit', 'Compte Global: Demande forte à Ghardaïa pour stock dormant (163j à Tiaret)', 163, '2026-11-11T14:48:55.983Z', NULL, '2026-11-10T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO transfers (id, reference, motorcycle_id, source_showroom_id, destination_showroom_id, status, reason, stock_age_at_request, approved_at, received_at, created_at)
VALUES ('76cf151d-4e38-4ce8-ab33-e2427383e41f', 'TRF-2026-0018', '795d30b3-b4d5-4c1e-a63e-9443b0c47662', '95fecef8-36b9-4792-a84d-b72574928187', '0c1b8b25-ca33-40e2-a110-28bde506e2c8', 'received', 'Compte Global: Demande forte à Guelma pour stock dormant (167j à El Oued)', 167, '2026-11-08T14:48:55.983Z', '2026-11-10T14:48:55.983Z', '2026-11-07T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO transfers (id, reference, motorcycle_id, source_showroom_id, destination_showroom_id, status, reason, stock_age_at_request, approved_at, received_at, created_at)
VALUES ('f0a1dd8d-f4c4-41cf-a8e8-0413ea16f061', 'TRF-2026-0019', 'f95ad5bf-7b3a-4ea7-ae56-9f5738134420', '44a8212b-d633-4b1f-ac98-ab12de68bcd2', 'ba4312b1-7ed3-4d02-a70c-9f64e10e93c6', 'rejected', 'Compte Global: Demande forte à Oum El Bouaghi pour stock dormant (171j à Khenchela)', 171, '2026-11-05T14:48:55.983Z', NULL, '2026-11-04T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO transfers (id, reference, motorcycle_id, source_showroom_id, destination_showroom_id, status, reason, stock_age_at_request, approved_at, received_at, created_at)
VALUES ('66ba0224-df41-4292-a124-7c2a4d94a372', 'TRF-2026-0020', 'ce2dd2ae-1629-40e7-a3f2-828ffc46703f', 'a1151a33-c181-4f15-ae21-d1143083fe9b', '0112ec21-a591-42ad-af2d-b766685906a0', 'pending', 'Compte Global: Demande forte à Relizane pour stock dormant (175j à Oued Ghir)', 175, NULL, NULL, '2026-11-21T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO transfers (id, reference, motorcycle_id, source_showroom_id, destination_showroom_id, status, reason, stock_age_at_request, approved_at, received_at, created_at)
VALUES ('9c829dcd-49cf-436d-a223-894815404d73', 'TRF-2026-0021', '5877c147-29c0-457b-ab0d-dab86f22dcde', '81154d42-2237-4ddd-a95f-e70dd0795b96', '690a1d9c-3454-48a9-a855-d96d4ebcfc63', 'approved', 'Compte Global: Demande forte à Dar El Beïda pour stock dormant (179j à Oued Rhiou)', 179, '2026-11-19T14:48:55.983Z', NULL, '2026-11-18T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO transfers (id, reference, motorcycle_id, source_showroom_id, destination_showroom_id, status, reason, stock_age_at_request, approved_at, received_at, created_at)
VALUES ('70151bd4-d5c7-4c85-a894-d6bcc024700f', 'TRF-2026-0022', '2f7f0a64-d2a2-4754-a16b-f5aa631224a8', '88d541ce-eb77-491b-ac5a-a72f9e548772', '37f82d93-cafd-4f41-af5f-1508b0b3b8f9', 'in_transit', 'Compte Global: Demande forte à Rouïba pour stock dormant (98j à Chéraga)', 98, '2026-11-16T14:48:55.983Z', NULL, '2026-11-15T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO transfers (id, reference, motorcycle_id, source_showroom_id, destination_showroom_id, status, reason, stock_age_at_request, approved_at, received_at, created_at)
VALUES ('d7f112da-6391-47e1-a338-c029a05a398c', 'TRF-2026-0023', '64baf8f0-7011-4b02-a81b-c7cae4605625', 'e9de928b-17a6-44e6-ae14-0942fb6fa85c', '654a20b5-3c93-47e1-aa05-b9cb364e463f', 'received', 'Compte Global: Demande forte à Es-Senia pour stock dormant (102j à Bab El Oued)', 102, '2026-11-13T14:48:55.983Z', '2026-11-15T14:48:55.983Z', '2026-11-12T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO transfers (id, reference, motorcycle_id, source_showroom_id, destination_showroom_id, status, reason, stock_age_at_request, approved_at, received_at, created_at)
VALUES ('cbde4572-8b59-4c05-aa1e-ebd45a278fb5', 'TRF-2026-0024', '09ed5615-5696-48ce-afb1-80853cf971b7', 'c4ad5610-eefc-4d85-ab1b-be67e397aeb6', '256f8a1b-b5e7-4991-a728-02b869440477', 'rejected', 'Compte Global: Demande forte à Ali Mendjeli pour stock dormant (106j à Bir El Djir)', 106, '2026-11-10T14:48:55.983Z', NULL, '2026-11-09T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('51fa4aaa-34dc-4432-a97a-6034f31939bd', 'VTE-2026-0001', '6bd90efe-075b-452a-adb5-a476e17eb14e', 'c1e837c2-e597-445a-a434-3f431684505f', 'Amine Belkacem', '0550200111', 335000, 'CHEQUE', '2026-11-14', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-11-14T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('4a6f91ff-a88b-438f-a815-d1b2b8a74ddc', 'VTE-2026-0002', 'e3c9c639-4d2d-484f-aaa3-a86bea53acf1', 'f5e1d4eb-cbc1-49dc-a6c7-b696f13675bf', 'Youcef Mansouri', '0550200222', 365000, 'VIREMENT', '2026-11-07', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-11-07T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('a0ae4f77-0a71-4bc6-a79d-e37f9f3d3b99', 'VTE-2026-0003', 'ef5146e3-4ce2-493e-a1c9-d2f90036922c', '4074181c-2e0e-4a3f-aedc-871b250b89a5', 'Karim Khelifi', '0550200333', 335000, 'FACILITE', '2026-10-31', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-10-31T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('b46fe9f2-c43b-4c76-adfe-eeb0ec3a138f', 'VTE-2026-0004', '146d897e-bea6-43ad-a1a8-498e7f9fc30d', 'c70bbe23-02c5-486e-ab34-be528137d4df', 'Walid Dahmani', '0550200444', 365000, 'CASH', '2026-10-24', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-10-24T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('21b2607b-6ddd-4639-abfa-f0433dcc539d', 'VTE-2026-0005', 'b98fd59c-749a-4482-acff-850b440c046f', '00a4e5aa-aeee-403f-af1c-1f8b058c4e12', 'Sofiane Saidi', '0550200555', 335000, 'CHEQUE', '2026-10-17', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-10-17T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('84ad00ae-a162-4816-a07f-70e543ad066d', 'VTE-2026-0006', 'cc24edfb-bcae-45ef-a874-7066ce73e310', 'f4e92145-68b7-4af7-a672-343e85e5f413', 'Bilal Boudiaf', '0550200666', 365000, 'VIREMENT', '2026-10-10', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-10-10T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('a3f65ea6-5d01-44bd-ab16-558a9d1c2fb6', 'VTE-2026-0007', 'e45ad110-c3c7-4373-a9cc-ca794349b938', '4d07418a-529d-4f69-a3bb-55da145e018a', 'Yacine Meziane', '0550200777', 335000, 'FACILITE', '2026-10-03', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-10-03T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('492dc9ad-a569-401d-ac3d-c82e73ebd04a', 'VTE-2026-0008', 'ada5a552-7911-4fe2-a8d0-2e3219228505', '437e31eb-4fec-4c07-a445-5844ff86bf98', 'Ryad Chaouch', '0550200888', 365000, 'CASH', '2026-09-26', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-09-26T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('e8de1931-7fa4-46a3-a861-c5e8c588189e', 'VTE-2026-0009', '73460632-14bf-467c-a955-93ab5e498d4b', 'edbb8233-80cb-4410-ae3f-65f0e5455e71', 'Mehdi Hadj', '0550200999', 335000, 'CHEQUE', '2026-11-18', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-11-18T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('bb0133b2-6fab-49e0-a7c8-29d48074969f', 'VTE-2026-0010', '39427f6d-8cae-497e-ad02-5275b4ef0927', '04a0a795-3b9d-4fbb-a974-c98ef044a2ab', 'Hamza Brahimi', '0550201110', 365000, 'VIREMENT', '2026-11-11', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-11-11T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('ff48ca18-fb4b-455d-accc-cc0a362359ae', 'VTE-2026-0011', 'e71471db-f328-49db-ac04-f2bcb11b90dd', 'fec556c3-9e83-4ab6-aeaf-2b446e6fed2c', 'Farouk Touati', '0550201221', 335000, 'FACILITE', '2026-11-04', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-11-04T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('179b5893-3ce3-46ba-aa3c-53691b190177', 'VTE-2026-0012', '58cdb5af-12b4-4f9d-a771-4bca44557adf', '98ea0cae-8457-4e21-aa3c-2ffccfbfe225', 'Abdelkader Guendouz', '0550201332', 365000, 'CASH', '2026-10-28', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-10-28T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('a819df2d-d901-44ea-ae4d-7a6703d57607', 'VTE-2026-0013', 'bd5e7e5e-3c93-4571-a8bf-ca77f444879c', 'f378804f-e6bf-424d-acaa-2fcd84b9edc4', 'Omar Zerrouki', '0550201443', 335000, 'CHEQUE', '2026-10-21', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-10-21T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('cb3b9a3a-6097-4a5a-a854-42b5ace80150', 'VTE-2026-0014', '481851c3-f2c4-45fd-aa1e-02a01cd0fbb3', '26d2ced3-df2f-4678-a147-084eb4c49e74', 'Mustapha Cherif', '0550201554', 365000, 'VIREMENT', '2026-10-14', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-10-14T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('a6315ea8-3e09-4fa8-a4ef-60ef28c4ced7', 'VTE-2026-0015', 'c6a5ab89-6658-4431-a999-9d6404c89c71', 'f4218e19-c304-4edb-aada-99dcd48a5841', 'Lotfi Benaissa', '0550201665', 335000, 'FACILITE', '2026-10-07', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-10-07T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('fe3715a7-c343-49cf-a861-28eb2f81a0e2', 'VTE-2026-0016', '4d1a9ecd-5605-4739-a7aa-5abbb9c0d355', 'f5efa6f8-3b54-4637-a6e3-487ce8f7ec9f', 'Samy Allouche', '0550201776', 365000, 'CASH', '2026-09-30', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-09-30T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('71e92957-382a-48d1-aeca-eb998d6db8c4', 'VTE-2026-0017', '06d8e262-7e45-41d0-a857-87efe974b243', '8d9bc5c6-0173-432d-a16e-318ec32c2ebc', 'Anis Bouaziz', '0550201887', 335000, 'CHEQUE', '2026-09-23', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-09-23T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('10ab7cd3-842d-41f8-a9a9-9a3e823e593e', 'VTE-2026-0018', '017dfe68-846c-4e6e-a15d-82265d505f78', '681c3797-0542-472c-a879-fc278802c8d0', 'Zinedine Mokhtari', '0550201998', 365000, 'VIREMENT', '2026-11-15', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-11-15T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('8cd73320-08fc-488a-aa12-6f208c40a208', 'VTE-2026-0019', '400c101b-192a-4516-adee-2e07176d5bfb', '7e8227ea-92b3-4ff3-af75-2ba2956b6e54', 'Islam Ferhat', '0550202109', 335000, 'FACILITE', '2026-11-08', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-11-08T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('0c583f96-e284-4175-a5f7-69a6c934bad3', 'VTE-2026-0020', '16d663a6-3756-4f39-aa01-ecd3b23fdc32', '894255e4-c95e-4fd0-ac78-d99da96abdf5', 'Oussama Slimani', '0550202220', 365000, 'CASH', '2026-11-01', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-11-01T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('25b95ac2-8c94-4f16-aa51-8fd54bdfc7f5', 'VTE-2026-0021', 'f3d7961a-83c3-49e3-a9ff-c4eec8f0e572', 'c1e837c2-e597-445a-a434-3f431684505f', 'Ayoub Tebboune', '0550202331', 335000, 'CHEQUE', '2026-10-25', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-10-25T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('885c9f54-5ba9-4f56-a7cb-dc4ad407d659', 'VTE-2026-0022', '58a3ddc8-6e80-449a-ae56-62757c0061df', 'f5e1d4eb-cbc1-49dc-a6c7-b696f13675bf', 'Zakaria Ould', '0550202442', 365000, 'VIREMENT', '2026-10-18', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-10-18T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('7f6daeff-c262-49c1-a415-1e338f5c4e0e', 'VTE-2026-0023', 'dbb19def-b4e5-456c-afea-b636cbc6905f', '4074181c-2e0e-4a3f-aedc-871b250b89a5', 'Reda Yahiaoui', '0550202553', 335000, 'FACILITE', '2026-10-11', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-10-11T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('64f61ca0-ca20-4c31-a8d0-133e98ddc345', 'VTE-2026-0024', '0938d8d0-aa4f-42ea-a4b9-27efbaeb7caa', 'c70bbe23-02c5-486e-ab34-be528137d4df', 'Nassim Mebarki', '0550202664', 365000, 'CASH', '2026-10-04', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-10-04T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('66be3087-2f79-49dd-a7d0-bbe2a8fbbd40', 'VTE-2026-0025', '04e054a6-3867-4496-a510-7c09923fd7e0', '00a4e5aa-aeee-403f-af1c-1f8b058c4e12', 'Meriem Larbi', '0550202775', 335000, 'CHEQUE', '2026-09-27', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-09-27T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('3c3f2a8e-32bc-4e46-a0d0-e616396b91c9', 'VTE-2026-0026', '297be197-8821-4acb-ac7f-0c430034b058', 'f4e92145-68b7-4af7-a672-343e85e5f413', 'Yasmine Zitouni', '0550202886', 365000, 'VIREMENT', '2026-11-19', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-11-19T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('624b072d-ecd9-47c7-a014-0e112a8de338', 'VTE-2026-0027', 'a66f6dca-431a-4502-a4b6-aed8753b8a62', '4d07418a-529d-4f69-a3bb-55da145e018a', 'Sarah Gherbi', '0550202997', 335000, 'FACILITE', '2026-11-12', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-11-12T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('e79a53b5-905e-47da-a337-75a27e95de1a', 'VTE-2026-0028', '465bf203-c71d-4b87-aea2-97cbacedc019', '437e31eb-4fec-4c07-a445-5844ff86bf98', 'Amina Hamidi', '0550203108', 365000, 'CASH', '2026-11-05', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-11-05T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('26d916dd-5f15-43de-a7c7-911c0329358d', 'VTE-2026-0029', 'b73c2af8-83a7-4dc1-aa19-b5e15a7cfba4', 'edbb8233-80cb-4410-ae3f-65f0e5455e71', 'Rania Taleb', '0550203219', 335000, 'CHEQUE', '2026-10-29', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-10-29T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('687e06e8-b0c9-4aca-a944-152a609f32fb', 'VTE-2026-0030', 'd6477bb6-42ce-4ce0-a33f-15307ffc35a7', '04a0a795-3b9d-4fbb-a974-c98ef044a2ab', 'Nour Amrani', '0550203330', 365000, 'VIREMENT', '2026-10-22', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-10-22T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('fc9fc626-5de9-4b24-a969-c19e00ebe0f0', 'VTE-2026-0031', '3ea86c54-a893-4552-aeca-7753b7b067b4', 'fec556c3-9e83-4ab6-aeaf-2b446e6fed2c', 'Selma Bensalah', '0550203441', 335000, 'FACILITE', '2026-10-15', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-10-15T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('5d2c862e-3043-4797-a363-9959ec4eccfc', 'VTE-2026-0032', '98bd37c1-f0ae-4d81-aadb-184162e9e811', '98ea0cae-8457-4e21-aa3c-2ffccfbfe225', 'Ines Ziane', '0550203552', 365000, 'CASH', '2026-10-08', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-10-08T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('71b9bdee-94c1-42db-a9c8-31e3bcc5c9ec', 'VTE-2026-0033', '19a8cda6-4344-4606-a827-723f152d7aa8', 'f378804f-e6bf-424d-acaa-2fcd84b9edc4', 'Chaima Chabane', '0550203663', 335000, 'CHEQUE', '2026-10-01', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-10-01T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('13b86d63-3209-4320-a6c8-ca1224ea4c74', 'VTE-2026-0034', '43b3808a-e284-4766-ad41-b0ac4696d0c2', '26d2ced3-df2f-4678-a147-084eb4c49e74', 'Lynda Naili', '0550203774', 365000, 'VIREMENT', '2026-09-24', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-09-24T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('ae4db3f1-ae38-4e7c-a3d3-a4d174de1c25', 'VTE-2026-0035', 'a5aa13a3-1973-4e26-aa6e-df4056f689be', 'f4218e19-c304-4edb-aada-99dcd48a5841', 'Fouad Djedidi', '0550203885', 335000, 'FACILITE', '2026-11-16', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-11-16T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('d1b5cb96-1c67-4ad9-a784-a5a115fb519b', 'VTE-2026-0036', '3151180b-90f7-45ea-a9fe-770cbcd38f3f', 'f5efa6f8-3b54-4637-a6e3-487ce8f7ec9f', 'Khaled Benali', '0550203996', 365000, 'CASH', '2026-11-09', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-11-09T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('8dede145-c3f6-4ec3-a807-fe4eeb7fe54c', 'VTE-2026-0037', '1625a46c-a46e-44b5-aedd-72583bd8075c', '8d9bc5c6-0173-432d-a16e-318ec32c2ebc', 'Tarek Belkacem', '0550204107', 335000, 'CHEQUE', '2026-11-02', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-11-02T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('292d6f38-bf69-42d2-a956-19fe407eaef1', 'VTE-2026-0038', '375e13a5-8f61-4ed4-a670-c68d27476008', '681c3797-0542-472c-a879-fc278802c8d0', 'Hichem Mansouri', '0550204218', 365000, 'VIREMENT', '2026-10-26', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-10-26T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('8821f569-9722-44b7-ae20-99caa1a46c68', 'VTE-2026-0039', '8cc7da1d-d1e5-4e8a-a946-60d608f7fa70', '7e8227ea-92b3-4ff3-af75-2ba2956b6e54', 'Moncef Khelifi', '0550204329', 335000, 'FACILITE', '2026-10-19', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-10-19T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('430dbe72-7f55-4b8f-a4eb-217efcb866aa', 'VTE-2026-0040', 'f7de2139-16ea-4027-a10f-eab8473a9faa', '894255e4-c95e-4fd0-ac78-d99da96abdf5', 'Mohamed Dahmani', '0550204440', 365000, 'CASH', '2026-10-12', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-10-12T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('230c32e7-e63e-405c-a8eb-8e7c239f2b9f', 'VTE-2026-0041', '7a948ac6-ed3c-4a32-a7e2-47620a2d0ac0', 'c1e837c2-e597-445a-a434-3f431684505f', 'Amine Saidi', '0550204551', 335000, 'CHEQUE', '2026-10-05', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-10-05T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('97c48c3e-dc64-4e16-adc5-4021e0f1a558', 'VTE-2026-0042', 'd843dee7-aef3-4e93-aeed-e87d38f46670', 'f5e1d4eb-cbc1-49dc-a6c7-b696f13675bf', 'Youcef Boudiaf', '0550204662', 365000, 'VIREMENT', '2026-09-28', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-09-28T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('df872607-6ed3-4650-ae8e-94cca916cd53', 'VTE-2026-0043', 'f32df664-fc81-4172-a9c8-fa2ff0ae92f7', '4074181c-2e0e-4a3f-aedc-871b250b89a5', 'Karim Meziane', '0550204773', 335000, 'FACILITE', '2026-11-20', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-11-20T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('ea8068e8-c88d-4a51-adf2-5941d311df44', 'VTE-2026-0044', 'd45706d4-d3ca-40fc-a9ba-da7f494b978a', 'c70bbe23-02c5-486e-ab34-be528137d4df', 'Walid Chaouch', '0550204884', 365000, 'CASH', '2026-11-13', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-11-13T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('6ff01c78-8758-4b22-a8c1-b9ce5036b67d', 'VTE-2026-0045', 'bd056681-63e2-42be-a89d-61c59a9cabc2', '00a4e5aa-aeee-403f-af1c-1f8b058c4e12', 'Sofiane Hadj', '0550204995', 335000, 'CHEQUE', '2026-11-06', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-11-06T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('d2e7a8fb-e09d-493b-a915-019700b12736', 'VTE-2026-0046', 'bf96177b-6758-41a0-a50b-279a05de834b', 'f4e92145-68b7-4af7-a672-343e85e5f413', 'Bilal Brahimi', '0550205106', 365000, 'VIREMENT', '2026-10-30', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-10-30T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('0751f389-5fe6-4668-ab73-0ebc27d9ac54', 'VTE-2026-0047', 'abb80628-eb25-4ea3-a164-0202ffd36e61', '4d07418a-529d-4f69-a3bb-55da145e018a', 'Yacine Touati', '0550205217', 335000, 'FACILITE', '2026-10-23', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-10-23T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('e33d781c-2703-4878-acb1-0312bd589b66', 'VTE-2026-0048', 'c25f3c51-af25-4242-a29f-2c71691e74eb', '437e31eb-4fec-4c07-a445-5844ff86bf98', 'Ryad Guendouz', '0550205328', 365000, 'CASH', '2026-10-16', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-10-16T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('eb01c1f3-e902-4197-a1be-f37b5bb23f9a', 'VTE-2026-0049', 'f644a501-3057-4ae5-af74-e5b9a5a1aaac', 'edbb8233-80cb-4410-ae3f-65f0e5455e71', 'Mehdi Zerrouki', '0550205439', 335000, 'CHEQUE', '2026-10-09', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-10-09T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('c57931a2-71f3-4bd3-ada8-597a74ea7129', 'VTE-2026-0050', '89f8fca6-6e3b-496d-a1c6-555e9f14fe1f', '04a0a795-3b9d-4fbb-a974-c98ef044a2ab', 'Hamza Cherif', '0550205550', 365000, 'VIREMENT', '2026-10-02', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-10-02T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('12c1e9f5-34b8-4fc8-a846-9040eee6f39a', 'VTE-2026-0051', '7cb8d368-4ffe-48bb-af7e-8a9a4af4bf1b', 'fec556c3-9e83-4ab6-aeaf-2b446e6fed2c', 'Farouk Benaissa', '0550205661', 335000, 'FACILITE', '2026-09-25', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-09-25T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('bc38d87d-7579-4df5-a8d8-cbf49ce83608', 'VTE-2026-0052', 'cad9b939-88ef-4358-ad48-d014b0ff8356', '98ea0cae-8457-4e21-aa3c-2ffccfbfe225', 'Abdelkader Allouche', '0550205772', 365000, 'CASH', '2026-11-17', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-11-17T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('e6721ca5-5aac-44c4-a59b-9ae91213ade8', 'VTE-2026-0053', '9f73ea69-5469-4ae4-a8b4-59c492f9ffd7', 'f378804f-e6bf-424d-acaa-2fcd84b9edc4', 'Omar Bouaziz', '0550205883', 335000, 'CHEQUE', '2026-11-10', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-11-10T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('a8fa69d3-c2f3-4bb3-a930-e69ad69cd34d', 'VTE-2026-0054', '974e7e6b-b499-4858-a57e-a0d00d1bbbf1', '26d2ced3-df2f-4678-a147-084eb4c49e74', 'Mustapha Mokhtari', '0550205994', 365000, 'VIREMENT', '2026-11-03', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-11-03T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('5355c53c-1253-4ef2-a546-7ba4908b7dcf', 'VTE-2026-0055', 'b9d04201-fdc3-404b-a50e-e163513d8a5d', 'f4218e19-c304-4edb-aada-99dcd48a5841', 'Lotfi Ferhat', '0550206105', 335000, 'FACILITE', '2026-10-27', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-10-27T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('437deac6-01b0-40f1-a2b4-64a2edf2ea05', 'VTE-2026-0056', 'f6607148-9884-4260-a48d-4c85a04991fc', 'f5efa6f8-3b54-4637-a6e3-487ce8f7ec9f', 'Samy Slimani', '0550206216', 365000, 'CASH', '2026-10-20', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-10-20T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('68ab604d-5f9e-4b6f-a3cf-cfb73341af92', 'VTE-2026-0057', 'dcd7fa03-9a12-456a-ab24-c396b823eb25', '8d9bc5c6-0173-432d-a16e-318ec32c2ebc', 'Anis Tebboune', '0550206327', 335000, 'CHEQUE', '2026-10-13', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-10-13T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('ba9c9c7d-fe5d-4ab9-ac9c-bb729e1316e4', 'VTE-2026-0058', '65c3bf57-a889-4432-a43b-c5c6bcfe7c80', '681c3797-0542-472c-a879-fc278802c8d0', 'Zinedine Ould', '0550206438', 365000, 'VIREMENT', '2026-10-06', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-10-06T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('1cd8b323-4948-4ed7-ad6e-f49697247514', 'VTE-2026-0059', 'dd0a86fa-4715-4306-a8a2-bb65faf8f389', '7e8227ea-92b3-4ff3-af75-2ba2956b6e54', 'Islam Yahiaoui', '0550206549', 335000, 'FACILITE', '2026-09-29', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-09-29T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('631518ed-4c38-4b27-a9b3-9d49259bb252', 'VTE-2026-0060', '41c1592d-7669-4205-ad9b-ff82b0e0fd91', '894255e4-c95e-4fd0-ac78-d99da96abdf5', 'Oussama Mebarki', '0550206660', 365000, 'CASH', '2026-11-21', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-11-21T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('0140ca52-f2ed-4f30-ae6e-71e58df6ff00', 'VTE-2026-0061', '159f04ad-40b1-4084-abf8-ecbe3d3e4d65', 'c1e837c2-e597-445a-a434-3f431684505f', 'Ayoub Larbi', '0550206771', 335000, 'CHEQUE', '2026-11-14', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-11-14T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('5553675d-52b6-4ef8-a876-6ee8937fdd19', 'VTE-2026-0062', '906d25c5-f26e-4f59-a71f-9520d4d6e38d', 'f5e1d4eb-cbc1-49dc-a6c7-b696f13675bf', 'Zakaria Zitouni', '0550206882', 365000, 'VIREMENT', '2026-11-07', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-11-07T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('8a02072e-6e0c-481c-a5af-d4ac52e8975a', 'VTE-2026-0063', '83c85b8e-20f8-4191-a109-640fff3221a6', '4074181c-2e0e-4a3f-aedc-871b250b89a5', 'Reda Gherbi', '0550206993', 335000, 'FACILITE', '2026-10-31', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-10-31T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('83a843b3-8028-48fd-abaf-5126f7675156', 'VTE-2026-0064', '4adf8164-0e6b-42e7-a6b6-1acf3fa56277', 'c70bbe23-02c5-486e-ab34-be528137d4df', 'Nassim Hamidi', '0550207104', 365000, 'CASH', '2026-10-24', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-10-24T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('7bd3c1d0-e691-4afe-aa2f-0f64a058b27e', 'VTE-2026-0065', '221d3f13-c5ef-4faa-a988-40d0b9ba4e38', '00a4e5aa-aeee-403f-af1c-1f8b058c4e12', 'Meriem Taleb', '0550207215', 335000, 'CHEQUE', '2026-10-17', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-10-17T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('ad1775af-7deb-41e4-a859-4a30cd1c66ab', 'VTE-2026-0066', '2095d39b-0063-43b2-a42b-6f62a90a0b6d', 'f4e92145-68b7-4af7-a672-343e85e5f413', 'Yasmine Amrani', '0550207326', 365000, 'VIREMENT', '2026-10-10', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-10-10T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('8bd84a09-6ff4-4027-acf9-07485c3b51da', 'VTE-2026-0067', '67aaa57b-af68-4b6c-a6a1-1cee6edf4b87', '4d07418a-529d-4f69-a3bb-55da145e018a', 'Sarah Bensalah', '0550207437', 335000, 'FACILITE', '2026-10-03', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-10-03T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('2ec238c2-8e20-42b9-a710-980f5ab3e8c2', 'VTE-2026-0068', '463ee757-2d42-4692-a62a-c11561e7d845', '437e31eb-4fec-4c07-a445-5844ff86bf98', 'Amina Ziane', '0550207548', 365000, 'CASH', '2026-09-26', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-09-26T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('368dc8db-4712-4595-a430-d0bb67d83960', 'VTE-2026-0069', '05b38f17-9ca6-4165-a9ea-43eea73571b2', 'edbb8233-80cb-4410-ae3f-65f0e5455e71', 'Rania Chabane', '0550207659', 335000, 'CHEQUE', '2026-11-18', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-11-18T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('e4f93dba-6481-4b8c-ad82-eb1f7914dd63', 'VTE-2026-0070', '0d8718d4-cb28-4e1b-a0df-0dad1ff80c75', '04a0a795-3b9d-4fbb-a974-c98ef044a2ab', 'Nour Naili', '0550207770', 365000, 'VIREMENT', '2026-11-11', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-11-11T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('32fa3bb3-33d5-4974-a1f5-d5ad6550c683', 'VTE-2026-0071', '93b16a46-1d14-44f4-a190-7d528938a51e', 'fec556c3-9e83-4ab6-aeaf-2b446e6fed2c', 'Selma Djedidi', '0550207881', 335000, 'FACILITE', '2026-11-04', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-11-04T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('af68ef7e-9a90-4d18-a572-fa3cee9f6fbe', 'VTE-2026-0072', '04efe006-3a5f-4bf8-ad5b-234f7dfaba06', '98ea0cae-8457-4e21-aa3c-2ffccfbfe225', 'Ines Benali', '0550207992', 365000, 'CASH', '2026-10-28', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-10-28T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('d07c2a3c-fe02-4b4c-a0cf-dcf809b84334', 'VTE-2026-0073', '56ac1f6b-9e58-4995-a397-57f384382f58', 'f378804f-e6bf-424d-acaa-2fcd84b9edc4', 'Chaima Belkacem', '0550208103', 335000, 'CHEQUE', '2026-10-21', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-10-21T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('bed0a445-a7ad-4783-a698-eb1fc588a8d3', 'VTE-2026-0074', '0372936a-f7d7-4d88-aec2-fbf07ba77dbe', '26d2ced3-df2f-4678-a147-084eb4c49e74', 'Lynda Mansouri', '0550208214', 365000, 'VIREMENT', '2026-10-14', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-10-14T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('f8a6ff64-dc1b-4731-afd5-7939b8987afe', 'VTE-2026-0075', '755b8a72-763c-4a76-aadd-3f83ed000f32', 'f4218e19-c304-4edb-aada-99dcd48a5841', 'Fouad Khelifi', '0550208325', 335000, 'FACILITE', '2026-10-07', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-10-07T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('bf896540-ddb2-470c-a57a-ee6fc84850ea', 'VTE-2026-0076', 'ae7583b3-1ccb-4db8-adc4-8a9ca3c71df0', 'f5efa6f8-3b54-4637-a6e3-487ce8f7ec9f', 'Khaled Dahmani', '0550208436', 365000, 'CASH', '2026-09-30', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-09-30T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('d33f6458-ae98-4fe2-ac1f-c50f2cddeb60', 'VTE-2026-0077', '5bb58d19-35af-4bde-a0a7-11e0003be69c', '8d9bc5c6-0173-432d-a16e-318ec32c2ebc', 'Tarek Saidi', '0550208547', 335000, 'CHEQUE', '2026-09-23', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-09-23T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('deb570b7-7fc7-4347-a11c-9230ebc0c90b', 'VTE-2026-0078', 'd797f027-8301-423b-a77b-cfef8596bd3a', '681c3797-0542-472c-a879-fc278802c8d0', 'Hichem Boudiaf', '0550208658', 365000, 'VIREMENT', '2026-11-15', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-11-15T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('bd07ef29-6503-405c-a11a-9b76439f3447', 'VTE-2026-0079', '00a63118-1f22-4657-acc2-027ed1201f5d', '7e8227ea-92b3-4ff3-af75-2ba2956b6e54', 'Moncef Meziane', '0550208769', 335000, 'FACILITE', '2026-11-08', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-11-08T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('7f6e849b-d958-47d9-aecc-482bbbfe3162', 'VTE-2026-0080', 'b7b661e7-19b1-4330-adc9-6e8a231de531', '894255e4-c95e-4fd0-ac78-d99da96abdf5', 'Mohamed Chaouch', '0550208880', 365000, 'CASH', '2026-11-01', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-11-01T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('48ea509c-3ccf-4f7f-aa22-4dc232e3ee87', 'VTE-2026-0081', 'b6214119-5e7a-47fd-a2b3-5f48c0dc58c9', 'c1e837c2-e597-445a-a434-3f431684505f', 'Amine Hadj', '0550208991', 335000, 'CHEQUE', '2026-10-25', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-10-25T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('74522a92-daa5-488c-adf0-cc3e52ee5fea', 'VTE-2026-0082', '8dfeb602-8ff8-44c1-a350-229853190c2d', 'f5e1d4eb-cbc1-49dc-a6c7-b696f13675bf', 'Youcef Brahimi', '0550209102', 365000, 'VIREMENT', '2026-10-18', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-10-18T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('a47600ac-0ea3-4008-a37c-46538eb1559d', 'VTE-2026-0083', '44ae730b-6f79-4d5b-a7ce-fe18488b205a', '4074181c-2e0e-4a3f-aedc-871b250b89a5', 'Karim Touati', '0550209213', 335000, 'FACILITE', '2026-10-11', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-10-11T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('e845fd71-6e54-4ce7-afb9-bb71b7a94bd2', 'VTE-2026-0084', '88c7683b-e028-41ba-acc8-cdd0ee2175f3', 'c70bbe23-02c5-486e-ab34-be528137d4df', 'Walid Guendouz', '0550209324', 365000, 'CASH', '2026-10-04', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-10-04T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)
VALUES ('20049487-5caa-416e-a187-e648fcc01840', 'VTE-2026-0085', '3767fa83-bf19-4a97-a2f2-328038f97696', '00a4e5aa-aeee-403f-af1c-1f8b058c4e12', 'Sofiane Zerrouki', '0550209435', 335000, 'CHEQUE', '2026-09-27', 'Vente showroom avec carte grise VMS et garantie 2 ans', '2026-09-27T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
COMMIT;
