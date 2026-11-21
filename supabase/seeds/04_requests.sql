BEGIN;
ALTER TABLE customer_requests DISABLE TRIGGER check_customer_request_limit;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('eec63fb8-47c5-4051-a316-3a74004dde4d', 'REQ-2026-0001', 'Amine', 'Khelifi', '0551100739', '+213551100739', 'amine.khelifi1@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '02', 'Ténès', 'pending', NULL, NULL, NULL, NULL, '2026-11-08T13:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('b15e0f8b-f618-4435-a5e3-5bf9851e60ce', 'REQ-2026-0002', 'Youcef', 'Boudiaf', '0552101478', '+213552101478', 'youcef.boudiaf2@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '03', 'Laghouat Centre', 'pending', NULL, NULL, NULL, NULL, '2026-10-26T12:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('74820823-ed46-4602-a61e-009a141138bc', 'REQ-2026-0003', 'Karim', 'Hadj', '0554102217', '+213554102217', 'karim.hadj3@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '04', 'Oum El Bouaghi Ouest', 'pending', NULL, NULL, NULL, NULL, '2026-10-13T11:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('70cde972-8a89-47ae-abd8-54f914de16bf', 'REQ-2026-0004', 'Walid', 'Guendouz', '0555102956', '+213555102956', 'walid.guendouz4@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '05', 'Batna Ville', 'available_notified', 'd6c883f8-c7df-4b55-a711-25fcc9a5cb13', '2026-11-18T14:48:55.983Z', NULL, NULL, '2026-11-09T10:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('8f679416-effc-40b2-ad40-63597a829587', 'REQ-2026-0005', 'Sofiane', 'Benaissa', '0560103695', '+213560103695', 'sofiane.benaissa5@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '06', 'Amizour', 'pending', NULL, NULL, NULL, NULL, '2026-10-27T09:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('364f93b7-c10e-4785-add5-21ea6b49274f', 'REQ-2026-0006', 'Bilal', 'Mokhtari', '0561104434', '+213561104434', 'bilal.mokhtari6@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '07', 'Biskra', 'fulfilled', '98ea0cae-8457-4e21-aa3c-2ffccfbfe225', '2026-11-11T14:48:55.983Z', '2026-11-19T14:48:55.983Z', NULL, '2026-10-14T08:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('8298a8cc-5c89-497c-af13-0289c7a87931', 'REQ-2026-0007', 'Yacine', 'Tebboune', '0660105173', '+213660105173', 'yacine.tebboune7@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '08', 'Béni Ounif', 'pending', NULL, NULL, NULL, NULL, '2026-11-10T07:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('0c354b8e-604b-4031-a08d-4d96d3265cce', 'REQ-2026-0008', 'Ryad', 'Mebarki', '0661105912', '+213661105912', 'ryad.mebarki8@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '09', 'Mouzaïa', 'available_notified', 'f4e92145-68b7-4af7-a672-343e85e5f413', '2026-11-18T14:48:55.983Z', NULL, NULL, '2026-10-28T06:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('19a5324b-ea21-4d60-a0ef-a22f5b2379c5', 'REQ-2026-0009', 'Mehdi', 'Gherbi', '0662106651', '+213662106651', 'mehdi.gherbi9@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '10', 'Bouira', 'pending', NULL, NULL, NULL, NULL, '2026-10-15T05:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('674bcf6b-ba04-450b-acd1-6c519daea5d8', 'REQ-2026-0010', 'Hamza', 'Amrani', '0770107390', '+213770107390', 'hamza.amrani10@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '11', 'Tamanrasset Centre', 'preorder_redirected', NULL, NULL, NULL, 'Redirigé vers motobladi.dz pour précommande', '2026-11-11T04:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('79421d93-cc45-4d33-ad23-b5f6dc41cd1a', 'REQ-2026-0011', 'Farouk', 'Chabane', '0771108129', '+213771108129', 'farouk.chabane11@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '12', 'El Aouinet', 'pending', NULL, NULL, NULL, NULL, '2026-10-29T03:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('276f4116-e26a-4b31-a3be-96d1d79cc4dd', 'REQ-2026-0012', 'Abdelkader', 'Benali', '0772108868', '+213772108868', 'abdelkader.benali12@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '13', 'Tlemcen Ville', 'fulfilled', '6676117f-09a1-4fe6-ad91-c5be0787fe7a', '2026-11-11T14:48:55.983Z', '2026-11-19T14:48:55.983Z', NULL, '2026-10-16T02:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('1d166752-2773-4ff7-a85a-8ef22d5c4da8', 'REQ-2026-0013', 'Omar', 'Khelifi', '0550109607', '+213550109607', 'omar.khelifi13@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '14', 'Sougueur', 'pending', NULL, NULL, NULL, NULL, '2026-11-12T01:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('f9fd7ca6-1485-498c-a168-cc3166d96efb', 'REQ-2026-0014', 'Mustapha', 'Boudiaf', '0551110346', '+213551110346', 'mustapha.boudiaf14@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '15', 'Draa Ben Khedda', 'pending', NULL, NULL, NULL, NULL, '2026-10-30T00:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('62af7c34-01c7-424d-a0d7-1d5b5578d7d0', 'REQ-2026-0015', 'Lotfi', 'Hadj', '0552111085', '+213552111085', 'lotfi.hadj15@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '16', 'Chéraga', 'pending', NULL, NULL, NULL, NULL, '2026-10-16T23:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('059f26d0-6eb3-4840-a963-f4218e6a4f7f', 'REQ-2026-0016', 'Samy', 'Guendouz', '0554111824', '+213554111824', 'samy.guendouz16@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '17', 'Aïn Oussera', 'available_notified', 'dafa8f2d-2471-4a5d-a0c6-24cd172fa668', '2026-11-18T14:48:55.983Z', NULL, NULL, '2026-11-12T22:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('dabab0e2-27ca-4c89-a31a-e9922926531d', 'REQ-2026-0017', 'Anis', 'Benaissa', '0555112563', '+213555112563', 'anis.benaissa17@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '18', 'El Milia', 'pending', NULL, NULL, NULL, NULL, '2026-10-30T21:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('5f9651f8-c56f-4743-a1ea-eab2a830dff6', 'REQ-2026-0018', 'Zinedine', 'Mokhtari', '0560113302', '+213560113302', 'zinedine.mokhtari18@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '19', 'Aïn Arnat', 'fulfilled', '3f6f6575-5045-47c0-a7e2-ade1882ce203', '2026-11-11T14:48:55.983Z', '2026-11-19T14:48:55.983Z', NULL, '2026-10-17T20:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('185ce355-11ca-40b7-a6fc-299482e03155', 'REQ-2026-0019', 'Islam', 'Tebboune', '0561114041', '+213561114041', 'islam.tebboune19@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '20', 'Youb', 'pending', NULL, NULL, NULL, NULL, '2026-11-13T19:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('261c0e9f-0613-4738-a626-95732d773406', 'REQ-2026-0020', 'Oussama', 'Mebarki', '0660114780', '+213660114780', 'oussama.mebarki20@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '21', 'Collo', 'preorder_redirected', NULL, NULL, NULL, 'Redirigé vers motobladi.dz pour précommande', '2026-10-31T18:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('175664ff-27c6-4fe0-ad23-8f88903b952e', 'REQ-2026-0021', 'Ayoub', 'Gherbi', '0661115519', '+213661115519', 'ayoub.gherbi21@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '22', 'Sidi Bel Abbès', 'pending', NULL, NULL, NULL, NULL, '2026-10-18T17:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('ef91137a-5e7c-4fe1-ada1-94767b579767', 'REQ-2026-0022', 'Zakaria', 'Amrani', '0662116258', '+213662116258', 'zakaria.amrani22@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '23', 'Sidi Amar', 'pending', NULL, NULL, NULL, NULL, '2026-11-14T16:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('6d3730de-c622-4653-aff9-6c7198dd8e7a', 'REQ-2026-0023', 'Reda', 'Chabane', '0770116997', '+213770116997', 'reda.chabane23@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '24', 'Bouchegouf', 'pending', NULL, NULL, NULL, NULL, '2026-11-01T15:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('09d9ef8a-2d8f-48fe-ad97-7b503a8a2f43', 'REQ-2026-0024', 'Nassim', 'Benali', '0771117736', '+213771117736', 'nassim.benali24@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '25', 'Didouche Mourad', 'fulfilled', '256f8a1b-b5e7-4991-a728-02b869440477', '2026-11-11T14:48:55.983Z', '2026-11-19T14:48:55.983Z', NULL, '2026-10-20T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('3714415e-5ab2-4ac9-af2d-6a0aafff58b0', 'REQ-2026-0025', 'Meriem', 'Khelifi', '0772118475', '+213772118475', 'meriem.khelifi25@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '26', 'Berrouaghia', 'pending', NULL, NULL, NULL, NULL, '2026-11-16T13:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('f4773cdc-eb62-4e68-a020-c5dd598d620f', 'REQ-2026-0026', 'Yasmine', 'Boudiaf', '0550119214', '+213550119214', 'yasmine.boudiaf26@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '27', 'Sidi Ali', 'pending', NULL, NULL, NULL, NULL, '2026-11-03T12:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('1bb3b3a8-62e5-45f0-a78e-f45cc6eab3d5', 'REQ-2026-0027', 'Sarah', 'Hadj', '0551119953', '+213551119953', 'sarah.hadj27@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '28', 'M''Sila', 'pending', NULL, NULL, NULL, NULL, '2026-10-21T11:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('14aef06f-0a94-4577-ad90-a213564d81f9', 'REQ-2026-0028', 'Amina', 'Guendouz', '0552120692', '+213552120692', 'amina.guendouz28@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '29', 'Tighennif', 'available_notified', 'f378804f-e6bf-424d-acaa-2fcd84b9edc4', '2026-11-18T14:48:55.983Z', NULL, NULL, '2026-11-17T10:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('233a9ffc-f1bd-4edd-a4c1-a6b28959757d', 'REQ-2026-0029', 'Rania', 'Benaissa', '0554121431', '+213554121431', 'rania.benaissa29@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '30', 'Touggourt', 'pending', NULL, NULL, NULL, NULL, '2026-11-04T09:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('c4cf944c-0800-4094-a1f7-354a9f443231', 'REQ-2026-0030', 'Nour', 'Mokhtari', '0555122170', '+213555122170', 'nour.mokhtari30@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '31', 'Arzew', 'preorder_redirected', NULL, NULL, NULL, 'Redirigé vers motobladi.dz pour précommande', '2026-10-22T08:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('7e7fef0c-2449-4bd4-a3bf-2e80adf605d3', 'REQ-2026-0031', 'Selma', 'Tebboune', '0560122909', '+213560122909', 'selma.tebboune31@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '32', 'El Bayadh Ouest', 'pending', NULL, NULL, NULL, NULL, '2026-11-18T07:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('1fdebc1a-0c3a-4ab8-a93a-cac651859940', 'REQ-2026-0032', 'Ines', 'Mebarki', '0561123648', '+213561123648', 'ines.mebarki32@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '33', 'Illizi Centre', 'available_notified', 'a1151a33-c181-4f15-ae21-d1143083fe9b', '2026-11-18T14:48:55.983Z', NULL, NULL, '2026-11-05T06:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('1fde2c15-61a2-4aaa-a2d0-f6d47cf98df9', 'REQ-2026-0033', 'Chaima', 'Gherbi', '0660124387', '+213660124387', 'chaima.gherbi33@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '34', 'Bordj Bou Arréridj', 'pending', NULL, NULL, NULL, NULL, '2026-10-23T05:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('7b819d8b-0d4e-4ef1-a92c-1b88adcdf662', 'REQ-2026-0034', 'Lynda', 'Amrani', '0661125126', '+213661125126', 'lynda.amrani34@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '35', 'Khemis El Khechna', 'pending', NULL, NULL, NULL, NULL, '2026-11-19T04:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('0feede7a-aef7-4256-a761-acf190a7993b', 'REQ-2026-0035', 'Fouad', 'Chabane', '0662125865', '+213662125865', 'fouad.chabane35@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '36', 'El Tarf Ouest', 'pending', NULL, NULL, NULL, NULL, '2026-11-06T03:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('bd8ba582-f6fc-46b5-a9ae-a1aa1c5c0e97', 'REQ-2026-0036', 'Khaled', 'Benali', '0770126604', '+213770126604', 'khaled.benali36@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '37', 'Tindouf Centre', 'fulfilled', 'a1151a33-c181-4f15-ae21-d1143083fe9b', '2026-11-11T14:48:55.983Z', '2026-11-19T14:48:55.983Z', NULL, '2026-10-24T02:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('4e7d4e63-aaa3-4507-a7f0-86c38b7d55e0', 'REQ-2026-0037', 'Tarek', 'Khelifi', '0771127343', '+213771127343', 'tarek.khelifi37@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '38', 'Tissemsilt Ouest', 'pending', NULL, NULL, NULL, NULL, '2026-11-20T01:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('3e8db5d3-6d8f-4311-a0da-91cad663326f', 'REQ-2026-0038', 'Hichem', 'Boudiaf', '0772128082', '+213772128082', 'hichem.boudiaf38@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '39', 'Robbah', 'pending', NULL, NULL, NULL, NULL, '2026-11-07T00:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('a2c4894c-9478-4956-a7c9-2c510b70ccdf', 'REQ-2026-0039', 'Moncef', 'Hadj', '0550128821', '+213550128821', 'moncef.hadj39@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '40', 'Khenchela', 'pending', NULL, NULL, NULL, NULL, '2026-10-24T23:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('f5fcd0ac-2fd0-41b6-a290-f69adffbc543', 'REQ-2026-0040', 'Mohamed', 'Guendouz', '0551129560', '+213551129560', 'mohamed.guendouz40@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '41', 'Sedrata', 'preorder_redirected', NULL, NULL, NULL, 'Redirigé vers motobladi.dz pour précommande', '2026-11-20T22:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('64a8842e-68a7-40ca-a404-40e77b5cb4a6', 'REQ-2026-0041', 'Amine', 'Benaissa', '0552130299', '+213552130299', 'amine.benaissa41@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '42', 'Koléa', 'pending', NULL, NULL, NULL, NULL, '2026-11-07T21:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('158018cd-53ce-45dc-af76-a40b5ae032a1', 'REQ-2026-0042', 'Youcef', 'Mokhtari', '0554131038', '+213554131038', 'youcef.mokhtari42@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '43', 'Mila', 'fulfilled', '5fd21885-958b-4486-a040-dbc06353a06b', '2026-11-11T14:48:55.983Z', '2026-11-19T14:48:55.983Z', NULL, '2026-10-25T20:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('aa7d3be5-1cb2-4e16-a83b-29b7e24e7c29', 'REQ-2026-0043', 'Karim', 'Tebboune', '0555131777', '+213555131777', 'karim.tebboune43@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '44', 'Khemis Miliana', 'pending', NULL, NULL, NULL, NULL, '2026-10-12T19:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('c5681c26-48b8-4fb6-a273-eee574072f10', 'REQ-2026-0044', 'Walid', 'Mebarki', '0560132516', '+213560132516', 'walid.mebarki44@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '45', 'Naâma Centre', 'available_notified', 'a1151a33-c181-4f15-ae21-d1143083fe9b', '2026-11-18T14:48:55.983Z', NULL, NULL, '2026-11-08T18:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('5f141a19-23d8-4981-a806-c558ade22ea1', 'REQ-2026-0045', 'Sofiane', 'Gherbi', '0561133255', '+213561133255', 'sofiane.gherbi45@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '46', 'Aïn Témouchent', 'pending', NULL, NULL, NULL, NULL, '2026-10-26T17:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('b89d3d94-b9d2-4f72-af2a-2ea7b282f6f6', 'REQ-2026-0046', 'Bilal', 'Amrani', '0660133994', '+213660133994', 'bilal.amrani46@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '47', 'Metlili', 'pending', NULL, NULL, NULL, NULL, '2026-10-13T16:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('236e9f02-4291-4419-a88f-adfd23b47f82', 'REQ-2026-0047', 'Yacine', 'Chabane', '0661134733', '+213661134733', 'yacine.chabane47@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '48', 'Yellel', 'pending', NULL, NULL, NULL, NULL, '2026-11-09T15:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('dac91109-a97a-4276-a542-050d7c7603f9', 'REQ-2026-0048', 'Ryad', 'Benali', '0662135472', '+213662135472', 'ryad.benali48@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '49', 'Timimoun Centre', 'fulfilled', 'a1151a33-c181-4f15-ae21-d1143083fe9b', '2026-11-11T14:48:55.983Z', '2026-11-19T14:48:55.983Z', NULL, '2026-10-28T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('44c5aeef-0294-4028-a784-993e1282aa99', 'REQ-2026-0049', 'Mehdi', 'Khelifi', '0770136211', '+213770136211', 'mehdi.khelifi49@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '50', 'Bordj Badji Mokhtar Ouest', 'pending', NULL, NULL, NULL, NULL, '2026-10-15T13:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('e027ffc3-284a-45be-a07e-b0064c6ffa8f', 'REQ-2026-0050', 'Hamza', 'Boudiaf', '0771136950', '+213771136950', 'hamza.boudiaf0@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '51', 'Ouled Djellal Centre', 'preorder_redirected', NULL, NULL, NULL, 'Redirigé vers motobladi.dz pour précommande', '2026-11-11T12:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('8c560da1-1747-48d8-a3b0-eef163e6b5aa', 'REQ-2026-0051', 'Farouk', 'Hadj', '0772137689', '+213772137689', 'farouk.hadj1@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '52', 'Béni Abbès Ouest', 'pending', NULL, NULL, NULL, NULL, '2026-10-29T11:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('e7761fd9-a8e8-4c49-a044-3c2419b680da', 'REQ-2026-0052', 'Abdelkader', 'Guendouz', '0550138428', '+213550138428', 'abdelkader.guendouz2@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '53', 'In Salah Centre', 'available_notified', 'a1151a33-c181-4f15-ae21-d1143083fe9b', '2026-11-18T14:48:55.983Z', NULL, NULL, '2026-10-16T10:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('5759d9a6-7186-49d0-ac64-e8f6c6c926e2', 'REQ-2026-0053', 'Omar', 'Benaissa', '0551139167', '+213551139167', 'omar.benaissa3@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '54', 'In Guezzam Ouest', 'pending', NULL, NULL, NULL, NULL, '2026-11-12T09:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('938f0d43-cd0b-4995-a9f6-949c007bfe99', 'REQ-2026-0054', 'Mustapha', 'Mokhtari', '0552139906', '+213552139906', 'mustapha.mokhtari4@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '55', 'Touggourt Centre', 'fulfilled', '681c3797-0542-472c-a879-fc278802c8d0', '2026-11-11T14:48:55.983Z', '2026-11-19T14:48:55.983Z', NULL, '2026-10-30T08:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('740eea01-c92e-491a-a0cb-bd49117fa183', 'REQ-2026-0055', 'Lotfi', 'Tebboune', '0554140645', '+213554140645', 'lotfi.tebboune5@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '56', 'Djanet Ouest', 'pending', NULL, NULL, NULL, NULL, '2026-10-17T07:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('72c7d9ef-46ca-4b9b-acc2-0883c5016b10', 'REQ-2026-0056', 'Samy', 'Mebarki', '0555141384', '+213555141384', 'samy.mebarki6@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '57', 'El M''Ghair Centre', 'available_notified', 'a1151a33-c181-4f15-ae21-d1143083fe9b', '2026-11-18T14:48:55.983Z', NULL, NULL, '2026-11-13T06:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('82d8e2f0-953f-49f8-a0b1-424669c40976', 'REQ-2026-0057', 'Anis', 'Gherbi', '0560142123', '+213560142123', 'anis.gherbi7@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '58', 'El Meniaa Ouest', 'pending', NULL, NULL, NULL, NULL, '2026-10-31T05:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('781d6cf8-18e5-4ea2-a372-1ea2ce42d871', 'REQ-2026-0058', 'Zinedine', 'Amrani', '0561142862', '+213561142862', 'zinedine.amrani8@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '01', 'Reggane', 'pending', NULL, NULL, NULL, NULL, '2026-10-18T04:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('cc9a27cd-f41c-4bbe-a023-6d5ea1b04f66', 'REQ-2026-0059', 'Islam', 'Chabane', '0660143601', '+213660143601', 'islam.chabane9@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '02', 'Oued Fodda', 'pending', NULL, NULL, NULL, NULL, '2026-11-14T03:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('0c56a8c1-00d4-4f05-a1ca-1a3c9efe02e7', 'REQ-2026-0060', 'Oussama', 'Benali', '0661144340', '+213661144340', 'oussama.benali10@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '03', 'Laghouat Centre', 'preorder_redirected', NULL, NULL, NULL, 'Redirigé vers motobladi.dz pour précommande', '2026-11-01T02:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('f38fa1c2-a503-4798-a024-0af5390431c7', 'REQ-2026-0061', 'Ayoub', 'Khelifi', '0662145079', '+213662145079', 'ayoub.khelifi11@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '04', 'Oum El Bouaghi Ouest', 'pending', NULL, NULL, NULL, NULL, '2026-10-19T01:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('0490f2d1-ca38-4d6b-a111-1d9156b09993', 'REQ-2026-0062', 'Zakaria', 'Boudiaf', '0770145818', '+213770145818', 'zakaria.boudiaf12@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '05', 'Aïn Touta', 'pending', NULL, NULL, NULL, NULL, '2026-11-15T00:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('ae0329ee-eb20-4fcd-ac58-58643f9cd5b0', 'REQ-2026-0063', 'Reda', 'Hadj', '0771146557', '+213771146557', 'reda.hadj13@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '06', 'Oued Ghir', 'pending', NULL, NULL, NULL, NULL, '2026-11-01T23:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('c195dda9-dee9-458a-a772-fc186bd383a3', 'REQ-2026-0064', 'Nassim', 'Guendouz', '0772147296', '+213772147296', 'nassim.guendouz14@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '07', 'Tolga', 'available_notified', '98ea0cae-8457-4e21-aa3c-2ffccfbfe225', '2026-11-18T14:48:55.983Z', NULL, NULL, '2026-10-19T22:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('d7bf9821-b907-4f3f-ab34-c14d422b2326', 'REQ-2026-0065', 'Meriem', 'Benaissa', '0550148035', '+213550148035', 'meriem.benaissa15@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '08', 'Taghit', 'pending', NULL, NULL, NULL, NULL, '2026-11-15T21:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('cebd0e96-b823-485b-a250-2b9c0e56c936', 'REQ-2026-0066', 'Yasmine', 'Mokhtari', '0551148774', '+213551148774', 'yasmine.mokhtari16@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '09', 'Boufarik', 'fulfilled', 'f4e92145-68b7-4af7-a672-343e85e5f413', '2026-11-11T14:48:55.983Z', '2026-11-19T14:48:55.983Z', NULL, '2026-11-02T20:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('ec204148-96f9-43af-a660-2cc4ce62fcd3', 'REQ-2026-0067', 'Sarah', 'Tebboune', '0552149513', '+213552149513', 'sarah.tebboune17@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '10', 'Lakhdaria', 'pending', NULL, NULL, NULL, NULL, '2026-10-20T19:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('f46c1a30-8e54-4617-a224-6676c73fe823', 'REQ-2026-0068', 'Amina', 'Mebarki', '0554150252', '+213554150252', 'amina.mebarki18@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '11', 'Tamanrasset Centre', 'available_notified', 'a1151a33-c181-4f15-ae21-d1143083fe9b', '2026-11-18T14:48:55.983Z', NULL, NULL, '2026-11-16T18:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('210d5064-36cf-4ca1-aee8-f7e70d68fd63', 'REQ-2026-0069', 'Rania', 'Gherbi', '0555150991', '+213555150991', 'rania.gherbi19@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '12', 'Tébessa', 'pending', NULL, NULL, NULL, NULL, '2026-11-03T17:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('bf1cff86-5ec6-4345-a1d3-e21a1947c57b', 'REQ-2026-0070', 'Nour', 'Amrani', '0560151730', '+213560151730', 'nour.amrani20@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '13', 'Mansourah', 'preorder_redirected', NULL, NULL, NULL, 'Redirigé vers motobladi.dz pour précommande', '2026-10-21T16:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('1db2b98e-ab5f-45a2-a432-ba06221949eb', 'REQ-2026-0071', 'Selma', 'Chabane', '0561152469', '+213561152469', 'selma.chabane21@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '14', 'Frenda', 'pending', NULL, NULL, NULL, NULL, '2026-11-17T15:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('4c6b4582-7850-4396-a703-505cb9e2b10e', 'REQ-2026-0072', 'Ines', 'Benali', '0660153208', '+213660153208', 'ines.benali22@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '15', 'Tizi Ouzou', 'fulfilled', 'c13d2978-83d8-49b3-a4fe-93e92b1fc07f', '2026-11-11T14:48:55.983Z', '2026-11-19T14:48:55.983Z', NULL, '2026-11-05T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('56688dbe-20c1-4dee-a458-9c574f845542', 'REQ-2026-0073', 'Chaima', 'Khelifi', '0661153947', '+213661153947', 'chaima.khelifi23@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '16', 'Bouzaréah', 'pending', NULL, NULL, NULL, NULL, '2026-10-23T13:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('b25a035b-0aaa-47b8-a8d0-f0d64fc91838', 'REQ-2026-0074', 'Lynda', 'Boudiaf', '0662154686', '+213662154686', 'lynda.boudiaf24@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '17', 'Hassi Bahbah', 'pending', NULL, NULL, NULL, NULL, '2026-11-19T12:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('0a3b9e90-8466-496c-a1dd-34bceb641dfd', 'REQ-2026-0075', 'Fouad', 'Hadj', '0770155425', '+213770155425', 'fouad.hadj25@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '18', 'Jijel', 'pending', NULL, NULL, NULL, NULL, '2026-11-06T11:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('ec1a1466-0f7a-47ec-a305-5193145ec48a', 'REQ-2026-0076', 'Khaled', 'Guendouz', '0771156164', '+213771156164', 'khaled.guendouz26@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '19', 'El Eulma', 'available_notified', '3f6f6575-5045-47c0-a7e2-ade1882ce203', '2026-11-18T14:48:55.983Z', NULL, NULL, '2026-10-24T10:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('1b95b067-c118-4c16-a1e0-94db45111c91', 'REQ-2026-0077', 'Tarek', 'Benaissa', '0772156903', '+213772156903', 'tarek.benaissa27@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '20', 'Aïn El Hadjar', 'pending', NULL, NULL, NULL, NULL, '2026-11-20T09:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('dd4a02bc-2a3d-4246-aa02-a115d06dc7e4', 'REQ-2026-0078', 'Hichem', 'Mokhtari', '0550157642', '+213550157642', 'hichem.mokhtari28@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '21', 'Skikda', 'fulfilled', '26d2ced3-df2f-4678-a147-084eb4c49e74', '2026-11-11T14:48:55.983Z', '2026-11-19T14:48:55.983Z', NULL, '2026-11-07T08:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('8f9d5474-9f29-47b3-abc8-987ca9f96d87', 'REQ-2026-0079', 'Moncef', 'Tebboune', '0551158381', '+213551158381', 'moncef.tebboune29@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '22', 'Telagh', 'pending', NULL, NULL, NULL, NULL, '2026-10-25T07:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('c29c0c1d-f321-46d8-a1b4-12dc9d9e4cdd', 'REQ-2026-0080', 'Mohamed', 'Mebarki', '0552159120', '+213552159120', 'mohamed.mebarki30@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '23', 'Annaba Centre', 'preorder_redirected', NULL, NULL, NULL, 'Redirigé vers motobladi.dz pour précommande', '2026-11-21T06:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('9a5e7164-2cba-4a00-a34a-60561379f595', 'REQ-2026-0081', 'Amine', 'Gherbi', '0554159859', '+213554159859', 'amine.gherbi31@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '24', 'Guelma', 'pending', NULL, NULL, NULL, NULL, '2026-11-08T05:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('ebd217e9-edc0-46fe-a4c7-5ae388468125', 'REQ-2026-0082', 'Youcef', 'Amrani', '0555160598', '+213555160598', 'youcef.amrani32@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '25', 'Constantine Centre', 'pending', NULL, NULL, NULL, NULL, '2026-10-26T04:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('f45eb1a0-d559-4996-ad01-4a77aa61ec6d', 'REQ-2026-0083', 'Karim', 'Chabane', '0560161337', '+213560161337', 'karim.chabane33@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '26', 'Ksar El Boukhari', 'pending', NULL, NULL, NULL, NULL, '2026-10-13T03:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('fd175938-1a36-42f1-a272-acddf9da2132', 'REQ-2026-0084', 'Walid', 'Benali', '0561162076', '+213561162076', 'walid.benali34@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '27', 'Mostaganem', 'fulfilled', 'f4218e19-c304-4edb-aada-99dcd48a5841', '2026-11-11T14:48:55.983Z', '2026-11-19T14:48:55.983Z', NULL, '2026-11-09T02:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('153ade46-9702-4579-aeb9-9e8cbac3386b', 'REQ-2026-0085', 'Sofiane', 'Khelifi', '0660162815', '+213660162815', 'sofiane.khelifi35@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '28', 'Boussaâda', 'pending', NULL, NULL, NULL, NULL, '2026-10-27T01:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('a4c11963-0d82-4fe8-a2ea-ee056096800a', 'REQ-2026-0086', 'Bilal', 'Boudiaf', '0661163554', '+213661163554', 'bilal.boudiaf36@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '29', 'Sig', 'pending', NULL, NULL, NULL, NULL, '2026-10-14T00:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('d9b545bd-4ee8-4b8c-a08c-68d7f3286ac3', 'REQ-2026-0087', 'Yacine', 'Hadj', '0662164293', '+213662164293', 'yacine.hadj37@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '30', 'Ouargla', 'pending', NULL, NULL, NULL, NULL, '2026-11-09T23:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('d81241a0-0b5d-406a-ad9d-f8d6bff41358', 'REQ-2026-0088', 'Ryad', 'Guendouz', '0770165032', '+213770165032', 'ryad.guendouz38@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '31', 'Oran Centre', 'available_notified', '654a20b5-3c93-47e1-aa05-b9cb364e463f', '2026-11-18T14:48:55.983Z', NULL, NULL, '2026-10-27T22:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('809898c4-b2a0-44c2-aa1d-6a35154b8cdb', 'REQ-2026-0089', 'Mehdi', 'Benaissa', '0771165771', '+213771165771', 'mehdi.benaissa39@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '32', 'El Bayadh Ouest', 'pending', NULL, NULL, NULL, NULL, '2026-10-14T21:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('d4b02501-ba17-4380-ac0d-9e9d679a7cb8', 'REQ-2026-0090', 'Hamza', 'Mokhtari', '0772166510', '+213772166510', 'hamza.mokhtari40@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '33', 'Illizi Centre', 'preorder_redirected', NULL, NULL, NULL, 'Redirigé vers motobladi.dz pour précommande', '2026-11-10T20:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('801a5568-dd90-4389-a888-82568f3cc9bc', 'REQ-2026-0091', 'Farouk', 'Tebboune', '0550167249', '+213550167249', 'farouk.tebboune41@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '34', 'Ras El Oued', 'pending', NULL, NULL, NULL, NULL, '2026-10-28T19:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('1c5a9a41-bc62-4509-a241-8a88528cb276', 'REQ-2026-0092', 'Abdelkader', 'Mebarki', '0551167988', '+213551167988', 'abdelkader.mebarki42@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '35', 'Boudouaou', 'available_notified', 'ced756da-4380-41b2-adad-65d1de43d461', '2026-11-18T14:48:55.983Z', NULL, NULL, '2026-10-15T18:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('df4ef7c6-ca0f-4974-a6b9-d2935f76b165', 'REQ-2026-0093', 'Omar', 'Gherbi', '0552168727', '+213552168727', 'omar.gherbi43@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '36', 'El Tarf Ouest', 'pending', NULL, NULL, NULL, NULL, '2026-11-11T17:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('c1cc5c3b-2d0d-4976-a3bc-cad33e6bfae5', 'REQ-2026-0094', 'Mustapha', 'Amrani', '0554169466', '+213554169466', 'mustapha.amrani44@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '37', 'Tindouf Centre', 'pending', NULL, NULL, NULL, NULL, '2026-10-29T16:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('9201a93b-38a8-4a84-a7ae-8a8bfb66be20', 'REQ-2026-0095', 'Lotfi', 'Chabane', '0555170205', '+213555170205', 'lotfi.chabane45@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '38', 'Tissemsilt Ouest', 'pending', NULL, NULL, NULL, NULL, '2026-10-16T15:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('3fa01de4-e2e3-4bde-a6a8-170f2c519ab5', 'REQ-2026-0096', 'Samy', 'Benali', '0560170944', '+213560170944', 'samy.benali46@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '39', 'El Oued', 'fulfilled', '95fecef8-36b9-4792-a84d-b72574928187', '2026-11-11T14:48:55.983Z', '2026-11-19T14:48:55.983Z', NULL, '2026-11-13T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('1c6ce537-6cfe-4865-ac29-80c53324af5d', 'REQ-2026-0097', 'Anis', 'Khelifi', '0561171683', '+213561171683', 'anis.khelifi47@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '40', 'Chechar', 'pending', NULL, NULL, NULL, NULL, '2026-10-31T13:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('8d1a4509-59a2-4966-acdd-69557c5cb045', 'REQ-2026-0098', 'Zinedine', 'Boudiaf', '0660172422', '+213660172422', 'zinedine.boudiaf48@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '41', 'M''Daourouch', 'pending', NULL, NULL, NULL, NULL, '2026-10-18T12:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('74c96743-ad92-43c3-a22c-4a3af45d6ee8', 'REQ-2026-0099', 'Islam', 'Hadj', '0661173161', '+213661173161', 'islam.hadj49@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '42', 'Bou Ismaïl', 'pending', NULL, NULL, NULL, NULL, '2026-11-14T11:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('bda29358-56d2-42e9-a18b-94772c131bef', 'REQ-2026-0100', 'Oussama', 'Guendouz', '0662173900', '+213662173900', 'oussama.guendouz0@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '43', 'Chelghoum Laïd', 'preorder_redirected', NULL, NULL, NULL, 'Redirigé vers motobladi.dz pour précommande', '2026-11-01T10:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('dd222c70-f978-4bf7-a352-48380649a5ff', 'REQ-2026-0101', 'Ayoub', 'Benaissa', '0770174639', '+213770174639', 'ayoub.benaissa1@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '44', 'El Attaf', 'pending', NULL, NULL, NULL, NULL, '2026-10-19T09:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('722bb1fc-1780-4762-a143-bbe101fce58b', 'REQ-2026-0102', 'Zakaria', 'Mokhtari', '0771175378', '+213771175378', 'zakaria.mokhtari2@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '45', 'Naâma Centre', 'fulfilled', 'a1151a33-c181-4f15-ae21-d1143083fe9b', '2026-11-11T14:48:55.983Z', '2026-11-19T14:48:55.983Z', NULL, '2026-11-15T08:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('3a61e343-a4f6-489f-a887-c489c9c87464', 'REQ-2026-0103', 'Reda', 'Tebboune', '0772176117', '+213772176117', 'reda.tebboune3@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '46', 'Béni Saf', 'pending', NULL, NULL, NULL, NULL, '2026-11-02T07:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('920b18b7-f779-4476-ae95-9d597dd3c1c0', 'REQ-2026-0104', 'Nassim', 'Mebarki', '0550176856', '+213550176856', 'nassim.mebarki4@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '47', 'El Guerrara', 'available_notified', '202c7f95-9694-4e2a-a7ca-8f72a327e96c', '2026-11-18T14:48:55.983Z', NULL, NULL, '2026-10-20T06:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('73897216-d467-4df7-ac0a-31f7feb9c981', 'REQ-2026-0105', 'Meriem', 'Gherbi', '0551177595', '+213551177595', 'meriem.gherbi5@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '48', 'Relizane', 'pending', NULL, NULL, NULL, NULL, '2026-11-16T05:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('86377189-5774-4db0-aee1-fee5a6add967', 'REQ-2026-0106', 'Yasmine', 'Amrani', '0552178334', '+213552178334', 'yasmine.amrani6@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '49', 'Timimoun Centre', 'pending', NULL, NULL, NULL, NULL, '2026-11-03T04:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('f29e524f-7082-49f1-a9d4-b1620d6fbebf', 'REQ-2026-0107', 'Sarah', 'Chabane', '0554179073', '+213554179073', 'sarah.chabane7@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '50', 'Bordj Badji Mokhtar Ouest', 'pending', NULL, NULL, NULL, NULL, '2026-10-21T03:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('f7b9a3b7-59d9-4f39-a6a8-c50e314c2618', 'REQ-2026-0108', 'Amina', 'Benali', '0555179812', '+213555179812', 'amina.benali8@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '51', 'Ouled Djellal Centre', 'fulfilled', 'a1151a33-c181-4f15-ae21-d1143083fe9b', '2026-11-11T14:48:55.983Z', '2026-11-19T14:48:55.983Z', NULL, '2026-11-17T02:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('365eded1-719b-4791-a167-f295f9dae989', 'REQ-2026-0109', 'Rania', 'Khelifi', '0560180551', '+213560180551', 'rania.khelifi9@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '52', 'Béni Abbès Ouest', 'pending', NULL, NULL, NULL, NULL, '2026-11-04T01:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('8ccb513e-a63c-4eb5-ac35-8ffa0bfa8e10', 'REQ-2026-0110', 'Nour', 'Boudiaf', '0561181290', '+213561181290', 'nour.boudiaf10@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '53', 'In Salah Centre', 'preorder_redirected', NULL, NULL, NULL, 'Redirigé vers motobladi.dz pour précommande', '2026-10-22T00:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('13c39a98-dbec-4e62-aa97-a30b6a0a6d10', 'REQ-2026-0111', 'Selma', 'Hadj', '0660182029', '+213660182029', 'selma.hadj11@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '54', 'In Guezzam Ouest', 'pending', NULL, NULL, NULL, NULL, '2026-11-17T23:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('26365e33-34aa-4be2-a7d7-7c33839a6a6e', 'REQ-2026-0112', 'Ines', 'Guendouz', '0661182768', '+213661182768', 'ines.guendouz12@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '55', 'Touggourt Centre', 'available_notified', '681c3797-0542-472c-a879-fc278802c8d0', '2026-11-18T14:48:55.983Z', NULL, NULL, '2026-11-04T22:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('67cdd04b-dc70-4889-a34a-75ed79dc8158', 'REQ-2026-0113', 'Chaima', 'Benaissa', '0662183507', '+213662183507', 'chaima.benaissa13@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '56', 'Djanet Ouest', 'pending', NULL, NULL, NULL, NULL, '2026-10-22T21:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('a9edb6c8-3fe6-4a9b-acc5-1a0571536e56', 'REQ-2026-0114', 'Lynda', 'Mokhtari', '0770184246', '+213770184246', 'lynda.mokhtari14@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '57', 'El M''Ghair Centre', 'fulfilled', 'a1151a33-c181-4f15-ae21-d1143083fe9b', '2026-11-11T14:48:55.983Z', '2026-11-19T14:48:55.983Z', NULL, '2026-11-18T20:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('da6e2aeb-4564-4941-a2f5-a33010e7993b', 'REQ-2026-0115', 'Fouad', 'Tebboune', '0771184985', '+213771184985', 'fouad.tebboune15@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '58', 'El Meniaa Ouest', 'pending', NULL, NULL, NULL, NULL, '2026-11-05T19:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('c0215c5c-8882-45a6-a6db-f2ee930a58a7', 'REQ-2026-0116', 'Khaled', 'Mebarki', '0772185724', '+213772185724', 'khaled.mebarki16@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '01', 'Timimoun', 'available_notified', 'a1151a33-c181-4f15-ae21-d1143083fe9b', '2026-11-18T14:48:55.983Z', NULL, NULL, '2026-10-23T18:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('0c301709-a391-415b-ae17-1eadcb059f4a', 'REQ-2026-0117', 'Tarek', 'Gherbi', '0550186463', '+213550186463', 'tarek.gherbi17@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '02', 'Chlef Ville', 'pending', NULL, NULL, NULL, NULL, '2026-11-19T17:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('0b756810-5b43-475d-a086-674c232081a0', 'REQ-2026-0118', 'Hichem', 'Amrani', '0551187202', '+213551187202', 'hichem.amrani18@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '03', 'Laghouat Centre', 'pending', NULL, NULL, NULL, NULL, '2026-11-06T16:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('58d29241-5fa1-4257-acd3-5cd3c10d8618', 'REQ-2026-0119', 'Moncef', 'Chabane', '0552187941', '+213552187941', 'moncef.chabane19@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '04', 'Oum El Bouaghi Ouest', 'pending', NULL, NULL, NULL, NULL, '2026-10-24T15:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('a2b195d9-79ee-4d02-ae4e-7e14f6c7fbb2', 'REQ-2026-0120', 'Mohamed', 'Benali', '0554188680', '+213554188680', 'mohamed.benali20@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '05', 'Batna Ville', 'preorder_redirected', NULL, NULL, NULL, 'Redirigé vers motobladi.dz pour précommande', '2026-11-21T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('cb19f0bc-7d5c-427c-a11a-eaf1eade0c68', 'REQ-2026-0121', 'Amine', 'Khelifi', '0555189419', '+213555189419', 'amine.khelifi21@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '06', 'Tazmalt', 'pending', NULL, NULL, NULL, NULL, '2026-11-08T13:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('dd3c4a8c-275b-4603-aec6-a8219b04c60a', 'REQ-2026-0122', 'Youcef', 'Boudiaf', '0560190158', '+213560190158', 'youcef.boudiaf22@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '07', 'Sidi Okba', 'pending', NULL, NULL, NULL, NULL, '2026-10-26T12:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('eb8a3a42-9c3e-4b20-a355-dd8cf0346f31', 'REQ-2026-0123', 'Karim', 'Hadj', '0561190897', '+213561190897', 'karim.hadj23@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '08', 'Béchar', 'pending', NULL, NULL, NULL, NULL, '2026-10-13T11:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('95208c93-2c89-4f91-ab8e-6c0a84d0beac', 'REQ-2026-0124', 'Walid', 'Guendouz', '0660191636', '+213660191636', 'walid.guendouz24@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '09', 'El Affroun', 'available_notified', 'f4e92145-68b7-4af7-a672-343e85e5f413', '2026-11-18T14:48:55.983Z', NULL, NULL, '2026-11-09T10:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('5dc59276-649b-4536-afe6-1a02f64ecccb', 'REQ-2026-0125', 'Sofiane', 'Benaissa', '0661192375', '+213661192375', 'sofiane.benaissa25@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '10', 'Sour El Ghozlane', 'pending', NULL, NULL, NULL, NULL, '2026-10-27T09:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('73c5c265-fd49-4a39-acb4-7b83410af736', 'REQ-2026-0126', 'Bilal', 'Mokhtari', '0662193114', '+213662193114', 'bilal.mokhtari26@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '11', 'Tamanrasset Centre', 'fulfilled', 'a1151a33-c181-4f15-ae21-d1143083fe9b', '2026-11-11T14:48:55.983Z', '2026-11-19T14:48:55.983Z', NULL, '2026-10-14T08:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('a2871043-3f72-4238-a15f-bbf07ea4ab99', 'REQ-2026-0127', 'Yacine', 'Tebboune', '0770193853', '+213770193853', 'yacine.tebboune27@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '12', 'Cheria', 'pending', NULL, NULL, NULL, NULL, '2026-11-10T07:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('820682bd-6204-4dcf-aeba-c1333a2952ee', 'REQ-2026-0128', 'Ryad', 'Mebarki', '0771194592', '+213771194592', 'ryad.mebarki28@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '13', 'Tlemcen Ville', 'available_notified', '6676117f-09a1-4fe6-ad91-c5be0787fe7a', '2026-11-18T14:48:55.983Z', NULL, NULL, '2026-10-28T06:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('3890137e-ae17-4487-ac9b-07f0ad38a950', 'REQ-2026-0129', 'Mehdi', 'Gherbi', '0772195331', '+213772195331', 'mehdi.gherbi29@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '14', 'Tiaret', 'pending', NULL, NULL, NULL, NULL, '2026-10-15T05:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('06be8b38-20d3-4d76-abd8-0ac573403eee', 'REQ-2026-0130', 'Hamza', 'Amrani', '0550196070', '+213550196070', 'hamza.amrani30@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '15', 'Draa Ben Khedda', 'preorder_redirected', NULL, NULL, NULL, 'Redirigé vers motobladi.dz pour précommande', '2026-11-11T04:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('baedc848-6eda-4813-a7ee-a15dc2b85a31', 'REQ-2026-0131', 'Farouk', 'Chabane', '0551196809', '+213551196809', 'farouk.chabane31@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '16', 'El Harrach', 'pending', NULL, NULL, NULL, NULL, '2026-10-29T03:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('e35fe173-92bf-40dd-a2dc-41a610474cc5', 'REQ-2026-0132', 'Abdelkader', 'Benali', '0552197548', '+213552197548', 'abdelkader.benali32@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '17', 'Djelfa', 'fulfilled', 'dafa8f2d-2471-4a5d-a0c6-24cd172fa668', '2026-11-11T14:48:55.983Z', '2026-11-19T14:48:55.983Z', NULL, '2026-10-16T02:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('f573d8c7-208a-49f1-a78d-473ea2b73f50', 'REQ-2026-0133', 'Omar', 'Khelifi', '0554198287', '+213554198287', 'omar.khelifi33@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '18', 'Taher', 'pending', NULL, NULL, NULL, NULL, '2026-11-12T01:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('0b0ecd62-2b14-43e0-a0b1-70b4119af941', 'REQ-2026-0134', 'Mustapha', 'Boudiaf', '0555199026', '+213555199026', 'mustapha.boudiaf34@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '19', 'Bougaa', 'pending', NULL, NULL, NULL, NULL, '2026-10-30T00:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('69dc2e14-9c76-4ce9-a60c-a230aea05df6', 'REQ-2026-0135', 'Lotfi', 'Hadj', '0560199765', '+213560199765', 'lotfi.hadj35@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '20', 'Saïda', 'pending', NULL, NULL, NULL, NULL, '2026-10-16T23:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('5cd87f4d-4d01-4535-a360-94efa617ea59', 'REQ-2026-0136', 'Samy', 'Guendouz', '0561200504', '+213561200504', 'samy.guendouz36@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '21', 'El Harrouch', 'available_notified', '26d2ced3-df2f-4678-a147-084eb4c49e74', '2026-11-18T14:48:55.983Z', NULL, NULL, '2026-11-12T22:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('77c154fd-a572-4f5a-a25d-635ddbab280b', 'REQ-2026-0137', 'Anis', 'Benaissa', '0660201243', '+213660201243', 'anis.benaissa37@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '22', 'Ben Badis', 'pending', NULL, NULL, NULL, NULL, '2026-10-30T21:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('31b7f10d-bfbb-4ab3-a27c-3b2934085ced', 'REQ-2026-0138', 'Zinedine', 'Mokhtari', '0661201982', '+213661201982', 'zinedine.mokhtari38@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '23', 'Sidi Amar', 'fulfilled', '437e31eb-4fec-4c07-a445-5844ff86bf98', '2026-11-11T14:48:55.983Z', '2026-11-19T14:48:55.983Z', NULL, '2026-10-17T20:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('e50b5972-3b75-4f19-acd2-0418f835609d', 'REQ-2026-0139', 'Islam', 'Tebboune', '0662202721', '+213662202721', 'islam.tebboune39@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '24', 'Oued Zenati', 'pending', NULL, NULL, NULL, NULL, '2026-11-13T19:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('36dad5c6-7a07-474a-a72e-acfc1d952a50', 'REQ-2026-0140', 'Oussama', 'Mebarki', '0770203460', '+213770203460', 'oussama.mebarki40@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '25', 'Ali Mendjeli', 'preorder_redirected', NULL, NULL, NULL, 'Redirigé vers motobladi.dz pour précommande', '2026-10-31T18:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('365628ff-b65c-427d-a243-76ecb9d752cd', 'REQ-2026-0141', 'Ayoub', 'Gherbi', '0771204199', '+213771204199', 'ayoub.gherbi41@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '26', 'Médéa', 'pending', NULL, NULL, NULL, NULL, '2026-10-18T17:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('0e50d0a0-e915-4cec-a9d4-fc5c2ca5d77b', 'REQ-2026-0142', 'Zakaria', 'Amrani', '0772204938', '+213772204938', 'zakaria.amrani42@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '27', 'Aïn Tedeles', 'pending', NULL, NULL, NULL, NULL, '2026-11-14T16:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('02f4036f-312d-4424-a358-a9366faf41a3', 'REQ-2026-0143', 'Reda', 'Chabane', '0550205677', '+213550205677', 'reda.chabane43@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '28', 'Sidi Aïssa', 'pending', NULL, NULL, NULL, NULL, '2026-11-01T15:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('ff2b76cd-24be-46d7-a86b-031b0beaaba3', 'REQ-2026-0144', 'Nassim', 'Benali', '0551206416', '+213551206416', 'nassim.benali44@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '29', 'Mascara', 'fulfilled', 'f378804f-e6bf-424d-acaa-2fcd84b9edc4', '2026-11-11T14:48:55.983Z', '2026-11-19T14:48:55.983Z', NULL, '2026-10-20T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('d161c882-74e3-4e9c-a822-f3df96194f20', 'REQ-2026-0145', 'Meriem', 'Khelifi', '0552207155', '+213552207155', 'meriem.khelifi45@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '30', 'Hassi Messaoud', 'pending', NULL, NULL, NULL, NULL, '2026-11-16T13:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('1d5bd1f3-64c7-49a9-ab41-f09c35911643', 'REQ-2026-0146', 'Yasmine', 'Boudiaf', '0554207894', '+213554207894', 'yasmine.boudiaf46@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '31', 'Bethioua', 'pending', NULL, NULL, NULL, NULL, '2026-11-03T12:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('6c93781c-77c8-4906-ad23-d15a30a02321', 'REQ-2026-0147', 'Sarah', 'Hadj', '0555208633', '+213555208633', 'sarah.hadj47@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '32', 'El Bayadh Ouest', 'pending', NULL, NULL, NULL, NULL, '2026-10-21T11:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('ef5171db-ff86-43a8-a7ee-ce7970ad27a0', 'REQ-2026-0148', 'Amina', 'Guendouz', '0560209372', '+213560209372', 'amina.guendouz48@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '33', 'Illizi Centre', 'available_notified', 'a1151a33-c181-4f15-ae21-d1143083fe9b', '2026-11-18T14:48:55.983Z', NULL, NULL, '2026-11-17T10:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('c09d66f7-7627-4dd4-a8b7-3a833764bb82', 'REQ-2026-0149', 'Rania', 'Benaissa', '0561210111', '+213561210111', 'rania.benaissa49@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '34', 'Mansoura', 'pending', NULL, NULL, NULL, NULL, '2026-11-04T09:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('2db42bde-e163-47f0-a027-7037198be504', 'REQ-2026-0150', 'Nour', 'Mokhtari', '0660210850', '+213660210850', 'nour.mokhtari0@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '35', 'Boumerdès', 'preorder_redirected', NULL, NULL, NULL, 'Redirigé vers motobladi.dz pour précommande', '2026-10-22T08:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('962cafc7-395f-4c8e-aa99-36e85ed6b4f3', 'REQ-2026-0151', 'Selma', 'Tebboune', '0661211589', '+213661211589', 'selma.tebboune1@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '36', 'El Tarf Ouest', 'pending', NULL, NULL, NULL, NULL, '2026-11-18T07:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('c9da8f94-7a86-4d1b-a5fa-dd2cea98a897', 'REQ-2026-0152', 'Ines', 'Mebarki', '0662212328', '+213662212328', 'ines.mebarki2@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '37', 'Tindouf Centre', 'available_notified', 'a1151a33-c181-4f15-ae21-d1143083fe9b', '2026-11-18T14:48:55.983Z', NULL, NULL, '2026-11-05T06:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('43090d1d-2711-4ff4-a731-4990a0c03401', 'REQ-2026-0153', 'Chaima', 'Gherbi', '0770213067', '+213770213067', 'chaima.gherbi3@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '38', 'Tissemsilt Ouest', 'pending', NULL, NULL, NULL, NULL, '2026-10-23T05:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('b402afdd-6d5d-4af5-aaeb-98dc32d2df51', 'REQ-2026-0154', 'Lynda', 'Amrani', '0771213806', '+213771213806', 'lynda.amrani4@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '39', 'Guemar', 'pending', NULL, NULL, NULL, NULL, '2026-11-19T04:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('fe6d5a9f-7aac-4777-a7d4-f3135011b4bf', 'REQ-2026-0155', 'Fouad', 'Chabane', '0772214545', '+213772214545', 'fouad.chabane5@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '40', 'Kaïs', 'pending', NULL, NULL, NULL, NULL, '2026-11-06T03:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('8e4ec17f-4a82-46dd-ae23-bb5a299276e1', 'REQ-2026-0156', 'Khaled', 'Benali', '0550215284', '+213550215284', 'khaled.benali6@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '41', 'Souk Ahras', 'fulfilled', '7e8227ea-92b3-4ff3-af75-2ba2956b6e54', '2026-11-11T14:48:55.983Z', '2026-11-19T14:48:55.983Z', NULL, '2026-10-24T02:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('4067d640-1639-452d-ac59-a7e9b3c06177', 'REQ-2026-0157', 'Tarek', 'Khelifi', '0551216023', '+213551216023', 'tarek.khelifi7@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '42', 'Koléa', 'pending', NULL, NULL, NULL, NULL, '2026-11-20T01:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('c397b9db-0aad-42ce-a4bb-ab468372ad1c', 'REQ-2026-0158', 'Hichem', 'Boudiaf', '0552216762', '+213552216762', 'hichem.boudiaf8@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '43', 'Tadjenanet', 'pending', NULL, NULL, NULL, NULL, '2026-11-07T00:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('2a318860-c320-4940-a05f-e3323f17d40c', 'REQ-2026-0159', 'Moncef', 'Hadj', '0554217501', '+213554217501', 'moncef.hadj9@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '44', 'Aïn Defla', 'pending', NULL, NULL, NULL, NULL, '2026-10-24T23:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('fca4c56a-0f5c-4b2c-a71b-b0e8bb32bf8c', 'REQ-2026-0160', 'Mohamed', 'Guendouz', '0555218240', '+213555218240', 'mohamed.guendouz10@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '45', 'Naâma Centre', 'preorder_redirected', NULL, NULL, NULL, 'Redirigé vers motobladi.dz pour précommande', '2026-11-20T22:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('25446fe4-f42c-4723-a1dc-2cda77b472e8', 'REQ-2026-0161', 'Amine', 'Benaissa', '0560218979', '+213560218979', 'amine.benaissa11@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '46', 'Hammam Bouhadjar', 'pending', NULL, NULL, NULL, NULL, '2026-11-07T21:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('96d2f8a7-3e08-43d7-a14b-234529be0e1c', 'REQ-2026-0162', 'Youcef', 'Mokhtari', '0561219718', '+213561219718', 'youcef.mokhtari12@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '47', 'Ghardaïa', 'fulfilled', '202c7f95-9694-4e2a-a7ca-8f72a327e96c', '2026-11-11T14:48:55.983Z', '2026-11-19T14:48:55.983Z', NULL, '2026-10-25T20:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('5e67c611-9586-47a6-a73e-adf1e623f68c', 'REQ-2026-0163', 'Karim', 'Tebboune', '0660220457', '+213660220457', 'karim.tebboune13@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '48', 'Oued Rhiou', 'pending', NULL, NULL, NULL, NULL, '2026-10-12T19:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('ee9c3b89-ed15-44d1-ad70-7219ac148a20', 'REQ-2026-0164', 'Walid', 'Mebarki', '0661221196', '+213661221196', 'walid.mebarki14@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '49', 'Timimoun Centre', 'available_notified', 'a1151a33-c181-4f15-ae21-d1143083fe9b', '2026-11-18T14:48:55.983Z', NULL, NULL, '2026-11-08T18:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('47f7a6e3-1c8c-429a-ada0-798b1890aff0', 'REQ-2026-0165', 'Sofiane', 'Gherbi', '0662221935', '+213662221935', 'sofiane.gherbi15@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '50', 'Bordj Badji Mokhtar Ouest', 'pending', NULL, NULL, NULL, NULL, '2026-10-26T17:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('ff474f5e-d1f5-4619-a71c-bb3d93aa2e7e', 'REQ-2026-0166', 'Bilal', 'Amrani', '0770222674', '+213770222674', 'bilal.amrani16@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '51', 'Ouled Djellal Centre', 'pending', NULL, NULL, NULL, NULL, '2026-10-13T16:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('dd2baa65-7583-45a4-a805-88014872da5b', 'REQ-2026-0167', 'Yacine', 'Chabane', '0771223413', '+213771223413', 'yacine.chabane17@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '52', 'Béni Abbès Ouest', 'pending', NULL, NULL, NULL, NULL, '2026-11-09T15:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('381acfd3-32c1-46de-a3ea-ecd5e240ffcd', 'REQ-2026-0168', 'Ryad', 'Benali', '0772224152', '+213772224152', 'ryad.benali18@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '53', 'In Salah Centre', 'fulfilled', 'a1151a33-c181-4f15-ae21-d1143083fe9b', '2026-11-11T14:48:55.983Z', '2026-11-19T14:48:55.983Z', NULL, '2026-10-28T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('e0d7ee7b-c07d-4212-a32e-aac228d9b9ba', 'REQ-2026-0169', 'Mehdi', 'Khelifi', '0550224891', '+213550224891', 'mehdi.khelifi19@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '54', 'In Guezzam Ouest', 'pending', NULL, NULL, NULL, NULL, '2026-10-15T13:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('f4bf9616-d31c-4fed-a8ef-038e4805ec6d', 'REQ-2026-0170', 'Hamza', 'Boudiaf', '0551225630', '+213551225630', 'hamza.boudiaf20@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '55', 'Touggourt Centre', 'preorder_redirected', NULL, NULL, NULL, 'Redirigé vers motobladi.dz pour précommande', '2026-11-11T12:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('a2247753-3ee3-42f3-aaee-87be60ed57ab', 'REQ-2026-0171', 'Farouk', 'Hadj', '0552226369', '+213552226369', 'farouk.hadj21@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '56', 'Djanet Ouest', 'pending', NULL, NULL, NULL, NULL, '2026-10-29T11:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('1dad2eb7-b962-4696-a880-b187d5537502', 'REQ-2026-0172', 'Abdelkader', 'Guendouz', '0554227108', '+213554227108', 'abdelkader.guendouz22@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '57', 'El M''Ghair Centre', 'available_notified', 'a1151a33-c181-4f15-ae21-d1143083fe9b', '2026-11-18T14:48:55.983Z', NULL, NULL, '2026-10-16T10:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('02ecdbc5-8371-472e-acd9-b2c89eb4ffba', 'REQ-2026-0173', 'Omar', 'Benaissa', '0555227847', '+213555227847', 'omar.benaissa23@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '58', 'El Meniaa Ouest', 'pending', NULL, NULL, NULL, NULL, '2026-11-12T09:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('fbec4099-df67-43e7-a56c-b7694dc0f806', 'REQ-2026-0174', 'Mustapha', 'Mokhtari', '0560228586', '+213560228586', 'mustapha.mokhtari24@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '01', 'Adrar', 'fulfilled', 'a1151a33-c181-4f15-ae21-d1143083fe9b', '2026-11-11T14:48:55.983Z', '2026-11-19T14:48:55.983Z', NULL, '2026-10-30T08:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('7c210796-ac78-4f57-ae44-8adc93511c86', 'REQ-2026-0175', 'Lotfi', 'Tebboune', '0561229325', '+213561229325', 'lotfi.tebboune25@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '02', 'Ténès', 'pending', NULL, NULL, NULL, NULL, '2026-10-17T07:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('895e5e3f-1654-4388-a092-5118b6a0c30d', 'REQ-2026-0176', 'Samy', 'Mebarki', '0660230064', '+213660230064', 'samy.mebarki26@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '03', 'Laghouat Centre', 'available_notified', 'a1151a33-c181-4f15-ae21-d1143083fe9b', '2026-11-18T14:48:55.983Z', NULL, NULL, '2026-11-13T06:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('e57f897e-26f4-4cfa-ac3b-b16d9c2181b8', 'REQ-2026-0177', 'Anis', 'Gherbi', '0661230803', '+213661230803', 'anis.gherbi27@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '04', 'Oum El Bouaghi Ouest', 'pending', NULL, NULL, NULL, NULL, '2026-10-31T05:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('aa6fe4e9-52a3-4c4b-ae94-99097bce5b3d', 'REQ-2026-0178', 'Zinedine', 'Amrani', '0662231542', '+213662231542', 'zinedine.amrani28@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '05', 'Aïn Touta', 'pending', NULL, NULL, NULL, NULL, '2026-10-18T04:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('ddc25697-9ba9-4d48-a6a6-6cb9e48108d2', 'REQ-2026-0179', 'Islam', 'Chabane', '0770232281', '+213770232281', 'islam.chabane29@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '06', 'El Kseur', 'pending', NULL, NULL, NULL, NULL, '2026-11-14T03:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('e703ffef-b449-46d4-a93f-bdd5fc890529', 'REQ-2026-0180', 'Oussama', 'Benali', '0771233020', '+213771233020', 'oussama.benali30@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '07', 'Biskra', 'preorder_redirected', NULL, NULL, NULL, 'Redirigé vers motobladi.dz pour précommande', '2026-11-01T02:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('adcaeddf-ef58-4f53-a591-7a6cf811e85b', 'REQ-2026-0181', 'Ayoub', 'Khelifi', '0772233759', '+213772233759', 'ayoub.khelifi31@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '08', 'Béni Ounif', 'pending', NULL, NULL, NULL, NULL, '2026-10-19T01:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('d70021f5-6ab4-4069-a03e-89e90b0942fa', 'REQ-2026-0182', 'Zakaria', 'Boudiaf', '0550234498', '+213550234498', 'zakaria.boudiaf32@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '09', 'Ouled Yaïch', 'pending', NULL, NULL, NULL, NULL, '2026-11-15T00:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('e76dad7e-a47d-457c-ad47-40f49c748b05', 'REQ-2026-0183', 'Reda', 'Hadj', '0551235237', '+213551235237', 'reda.hadj33@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '10', 'Bouira', 'pending', NULL, NULL, NULL, NULL, '2026-11-01T23:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('ebb47f8a-985f-46ce-a719-762355da06ca', 'REQ-2026-0184', 'Nassim', 'Guendouz', '0552235976', '+213552235976', 'nassim.guendouz34@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '11', 'Tamanrasset Centre', 'available_notified', 'a1151a33-c181-4f15-ae21-d1143083fe9b', '2026-11-18T14:48:55.983Z', NULL, NULL, '2026-10-19T22:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('eaa62c98-bc1b-42fd-a6b6-1afec080f19b', 'REQ-2026-0185', 'Meriem', 'Benaissa', '0554236715', '+213554236715', 'meriem.benaissa35@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '12', 'El Aouinet', 'pending', NULL, NULL, NULL, NULL, '2026-11-15T21:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('133c436b-76f6-41fd-af9f-12cd01749094', 'REQ-2026-0186', 'Yasmine', 'Mokhtari', '0555237454', '+213555237454', 'yasmine.mokhtari36@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '13', 'Mansourah', 'fulfilled', '6676117f-09a1-4fe6-ad91-c5be0787fe7a', '2026-11-11T14:48:55.983Z', '2026-11-19T14:48:55.983Z', NULL, '2026-11-02T20:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('33b20ffb-6187-40a2-a5cb-50ebf1ffa619', 'REQ-2026-0187', 'Sarah', 'Tebboune', '0560238193', '+213560238193', 'sarah.tebboune37@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '14', 'Sougueur', 'pending', NULL, NULL, NULL, NULL, '2026-10-20T19:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('fb704529-0abc-4779-a020-b36cf25b8526', 'REQ-2026-0188', 'Amina', 'Mebarki', '0561238932', '+213561238932', 'amina.mebarki38@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '15', 'Tizi Ouzou', 'available_notified', 'c13d2978-83d8-49b3-a4fe-93e92b1fc07f', '2026-11-18T14:48:55.983Z', NULL, NULL, '2026-11-16T18:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('05540344-f96b-468c-ad75-f71d3cb341c3', 'REQ-2026-0189', 'Rania', 'Gherbi', '0660239671', '+213660239671', 'rania.gherbi39@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '16', 'Zéralda', 'pending', NULL, NULL, NULL, NULL, '2026-11-03T17:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('58ca52c1-88ef-44b4-ad8e-7678954abe21', 'REQ-2026-0190', 'Nour', 'Amrani', '0661240410', '+213661240410', 'nour.amrani40@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '17', 'Aïn Oussera', 'preorder_redirected', NULL, NULL, NULL, 'Redirigé vers motobladi.dz pour précommande', '2026-10-21T16:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('ca5d2ef5-502f-47f6-adf9-c54cdabe4f0c', 'REQ-2026-0191', 'Selma', 'Chabane', '0662241149', '+213662241149', 'selma.chabane41@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '18', 'El Milia', 'pending', NULL, NULL, NULL, NULL, '2026-11-17T15:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('3e7e2c08-ace2-4d1d-a2ac-281217312968', 'REQ-2026-0192', 'Ines', 'Benali', '0770241888', '+213770241888', 'ines.benali42@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '19', 'Aïn Oulmene', 'fulfilled', '3f6f6575-5045-47c0-a7e2-ade1882ce203', '2026-11-11T14:48:55.983Z', '2026-11-19T14:48:55.983Z', NULL, '2026-11-05T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('aa256705-24a6-425d-ab3f-d1d1a6f7255e', 'REQ-2026-0193', 'Chaima', 'Khelifi', '0771242627', '+213771242627', 'chaima.khelifi43@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '20', 'Youb', 'pending', NULL, NULL, NULL, NULL, '2026-10-23T13:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('d03bfa00-06bd-4421-ad92-ec72dea96d70', 'REQ-2026-0194', 'Lynda', 'Boudiaf', '0772243366', '+213772243366', 'lynda.boudiaf44@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '21', 'Collo', 'pending', NULL, NULL, NULL, NULL, '2026-11-19T12:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('21383ccc-85c2-4cef-a12b-d83f9db9b369', 'REQ-2026-0195', 'Fouad', 'Hadj', '0550244105', '+213550244105', 'fouad.hadj45@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '22', 'Sidi Bel Abbès', 'pending', NULL, NULL, NULL, NULL, '2026-11-06T11:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('ba173563-c053-4aca-a580-3a485669dddc', 'REQ-2026-0196', 'Khaled', 'Guendouz', '0551244844', '+213551244844', 'khaled.guendouz46@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '23', 'Annaba Centre', 'available_notified', '437e31eb-4fec-4c07-a445-5844ff86bf98', '2026-11-18T14:48:55.983Z', NULL, NULL, '2026-10-24T10:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('4b676e58-5a16-4d0c-a987-bdbdcf44d755', 'REQ-2026-0197', 'Tarek', 'Benaissa', '0552245583', '+213552245583', 'tarek.benaissa47@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '24', 'Bouchegouf', 'pending', NULL, NULL, NULL, NULL, '2026-11-20T09:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('edba0614-1e90-42c1-a2b1-c5f136d14d05', 'REQ-2026-0198', 'Hichem', 'Mokhtari', '0554246322', '+213554246322', 'hichem.mokhtari48@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '25', 'Hamma Bouziane', 'fulfilled', '256f8a1b-b5e7-4991-a728-02b869440477', '2026-11-11T14:48:55.983Z', '2026-11-19T14:48:55.983Z', NULL, '2026-11-07T08:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('dd9e98fe-8134-4706-a468-dad7cb57db9c', 'REQ-2026-0199', 'Moncef', 'Tebboune', '0555247061', '+213555247061', 'moncef.tebboune49@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '26', 'Berrouaghia', 'pending', NULL, NULL, NULL, NULL, '2026-10-25T07:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('64eb771a-1f8b-426f-a72d-dd6522cb962e', 'REQ-2026-0200', 'Mohamed', 'Mebarki', '0560247800', '+213560247800', 'mohamed.mebarki0@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '27', 'Sidi Ali', 'preorder_redirected', NULL, NULL, NULL, 'Redirigé vers motobladi.dz pour précommande', '2026-11-21T06:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('fddbd1ed-cf40-4831-ab79-a961091c49ae', 'REQ-2026-0201', 'Amine', 'Gherbi', '0561248539', '+213561248539', 'amine.gherbi1@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '28', 'M''Sila', 'pending', NULL, NULL, NULL, NULL, '2026-11-08T05:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('91c8c733-568c-416c-a8e8-4ccec689a0f8', 'REQ-2026-0202', 'Youcef', 'Amrani', '0660249278', '+213660249278', 'youcef.amrani2@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '29', 'Tighennif', 'pending', NULL, NULL, NULL, NULL, '2026-10-26T04:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('146984c4-0ce5-4513-a6d0-04fbf40c354e', 'REQ-2026-0203', 'Karim', 'Chabane', '0661250017', '+213661250017', 'karim.chabane3@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '30', 'Touggourt', 'pending', NULL, NULL, NULL, NULL, '2026-10-13T03:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('6c47a26c-64cc-4bbc-ac68-8681cc94d437', 'REQ-2026-0204', 'Walid', 'Benali', '0662250756', '+213662250756', 'walid.benali4@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '31', 'Bir El Djir', 'fulfilled', '654a20b5-3c93-47e1-aa05-b9cb364e463f', '2026-11-11T14:48:55.983Z', '2026-11-19T14:48:55.983Z', NULL, '2026-11-09T02:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('8906ebad-6465-49e9-a68c-026d2a90b767', 'REQ-2026-0205', 'Sofiane', 'Khelifi', '0770251495', '+213770251495', 'sofiane.khelifi5@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '32', 'El Bayadh Ouest', 'pending', NULL, NULL, NULL, NULL, '2026-10-27T01:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('fafd31d1-293e-446a-ab2d-f8c46db02993', 'REQ-2026-0206', 'Bilal', 'Boudiaf', '0771252234', '+213771252234', 'bilal.boudiaf6@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '33', 'Illizi Centre', 'pending', NULL, NULL, NULL, NULL, '2026-10-14T00:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('d1cdb013-43bc-4cfe-a06d-9af7014435e7', 'REQ-2026-0207', 'Yacine', 'Hadj', '0772252973', '+213772252973', 'yacine.hadj7@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '34', 'Bordj Bou Arréridj', 'pending', NULL, NULL, NULL, NULL, '2026-11-09T23:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('2348900d-c6dc-41d9-a0d1-1e08088b22f0', 'REQ-2026-0208', 'Ryad', 'Guendouz', '0550253712', '+213550253712', 'ryad.guendouz8@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '35', 'Khemis El Khechna', 'available_notified', 'ced756da-4380-41b2-adad-65d1de43d461', '2026-11-18T14:48:55.983Z', NULL, NULL, '2026-10-27T22:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('adc0b0cf-469f-462b-adf4-4e3fe02db8a9', 'REQ-2026-0209', 'Mehdi', 'Benaissa', '0551254451', '+213551254451', 'mehdi.benaissa9@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '36', 'El Tarf Ouest', 'pending', NULL, NULL, NULL, NULL, '2026-10-14T21:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('ed686c5f-3ab1-4836-a0c0-ca53a4121040', 'REQ-2026-0210', 'Hamza', 'Mokhtari', '0552255190', '+213552255190', 'hamza.mokhtari10@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '37', 'Tindouf Centre', 'preorder_redirected', NULL, NULL, NULL, 'Redirigé vers motobladi.dz pour précommande', '2026-11-10T20:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('a305ba82-24aa-4846-a6b2-b0dba841856f', 'REQ-2026-0211', 'Farouk', 'Tebboune', '0554255929', '+213554255929', 'farouk.tebboune11@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '38', 'Tissemsilt Ouest', 'pending', NULL, NULL, NULL, NULL, '2026-10-28T19:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('53c581b5-7c6e-4b7e-ab3c-869b2fb1fe67', 'REQ-2026-0212', 'Abdelkader', 'Mebarki', '0555256668', '+213555256668', 'abdelkader.mebarki12@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '39', 'Robbah', 'available_notified', '95fecef8-36b9-4792-a84d-b72574928187', '2026-11-18T14:48:55.983Z', NULL, NULL, '2026-10-15T18:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('a4b8eeb8-a34f-4cc9-a2f6-b8bd70004b91', 'REQ-2026-0213', 'Omar', 'Gherbi', '0560257407', '+213560257407', 'omar.gherbi13@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '40', 'Khenchela', 'pending', NULL, NULL, NULL, NULL, '2026-11-11T17:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('1dbf2e25-d056-4768-afe7-e0de2715ac0d', 'REQ-2026-0214', 'Mustapha', 'Amrani', '0561258146', '+213561258146', 'mustapha.amrani14@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '41', 'Sedrata', 'pending', NULL, NULL, NULL, NULL, '2026-10-29T16:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('2ed404c2-625a-4328-a954-0a089d500b5b', 'REQ-2026-0215', 'Lotfi', 'Chabane', '0660258885', '+213660258885', 'lotfi.chabane15@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '42', 'Bou Ismaïl', 'pending', NULL, NULL, NULL, NULL, '2026-10-16T15:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('5d9d68f8-3efb-4d38-a570-ef7d00dd0ec3', 'REQ-2026-0216', 'Samy', 'Benali', '0661259624', '+213661259624', 'samy.benali16@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '43', 'Mila', 'fulfilled', '5fd21885-958b-4486-a040-dbc06353a06b', '2026-11-11T14:48:55.983Z', '2026-11-19T14:48:55.983Z', NULL, '2026-11-13T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('dff6627b-4c70-4131-aad3-9c9dfe67c2ca', 'REQ-2026-0217', 'Anis', 'Khelifi', '0662260363', '+213662260363', 'anis.khelifi17@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '44', 'Khemis Miliana', 'pending', NULL, NULL, NULL, NULL, '2026-10-31T13:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('6b1f24a0-0c47-4ad4-a810-5931f1e8ce6f', 'REQ-2026-0218', 'Zinedine', 'Boudiaf', '0770261102', '+213770261102', 'zinedine.boudiaf18@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '45', 'Naâma Centre', 'pending', NULL, NULL, NULL, NULL, '2026-10-18T12:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('81ef1078-2a50-41e1-a302-cb57bc643baa', 'REQ-2026-0219', 'Islam', 'Hadj', '0771261841', '+213771261841', 'islam.hadj19@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '46', 'Aïn Témouchent', 'pending', NULL, NULL, NULL, NULL, '2026-11-14T11:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('7aee401f-7ea6-4faa-a835-b466f20789bd', 'REQ-2026-0220', 'Oussama', 'Guendouz', '0772262580', '+213772262580', 'oussama.guendouz20@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '47', 'Metlili', 'preorder_redirected', NULL, NULL, NULL, 'Redirigé vers motobladi.dz pour précommande', '2026-11-01T10:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('6eedafd1-2d6a-48c5-a6b3-5ca417f44ac9', 'REQ-2026-0221', 'Ayoub', 'Benaissa', '0550263319', '+213550263319', 'ayoub.benaissa21@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '48', 'Yellel', 'pending', NULL, NULL, NULL, NULL, '2026-10-19T09:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('7ebe22e0-b680-4fd9-af39-20dbb1f1a387', 'REQ-2026-0222', 'Zakaria', 'Mokhtari', '0551264058', '+213551264058', 'zakaria.mokhtari22@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '49', 'Timimoun Centre', 'fulfilled', 'a1151a33-c181-4f15-ae21-d1143083fe9b', '2026-11-11T14:48:55.983Z', '2026-11-19T14:48:55.983Z', NULL, '2026-11-15T08:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('97b8c44a-61db-461d-a8b1-c55f48a0c115', 'REQ-2026-0223', 'Reda', 'Tebboune', '0552264797', '+213552264797', 'reda.tebboune23@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '50', 'Bordj Badji Mokhtar Ouest', 'pending', NULL, NULL, NULL, NULL, '2026-11-02T07:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('bc738ace-cd39-4da3-a829-e27a39512a04', 'REQ-2026-0224', 'Nassim', 'Mebarki', '0554265536', '+213554265536', 'nassim.mebarki24@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '51', 'Ouled Djellal Centre', 'available_notified', 'a1151a33-c181-4f15-ae21-d1143083fe9b', '2026-11-18T14:48:55.983Z', NULL, NULL, '2026-10-20T06:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('ff38b54e-2c9d-445f-a90d-772316b34b01', 'REQ-2026-0225', 'Meriem', 'Gherbi', '0555266275', '+213555266275', 'meriem.gherbi25@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '52', 'Béni Abbès Ouest', 'pending', NULL, NULL, NULL, NULL, '2026-11-16T05:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('672ad011-1a42-4619-a0c3-bfb39939496b', 'REQ-2026-0226', 'Yasmine', 'Amrani', '0560267014', '+213560267014', 'yasmine.amrani26@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '53', 'In Salah Centre', 'pending', NULL, NULL, NULL, NULL, '2026-11-03T04:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('033ff622-d0d7-4d0f-a8fe-1cdf2995833c', 'REQ-2026-0227', 'Sarah', 'Chabane', '0561267753', '+213561267753', 'sarah.chabane27@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '54', 'In Guezzam Ouest', 'pending', NULL, NULL, NULL, NULL, '2026-10-21T03:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('896c1f61-4c5a-4097-a522-4ce6da08bae2', 'REQ-2026-0228', 'Amina', 'Benali', '0660268492', '+213660268492', 'amina.benali28@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '55', 'Touggourt Centre', 'fulfilled', '681c3797-0542-472c-a879-fc278802c8d0', '2026-11-11T14:48:55.983Z', '2026-11-19T14:48:55.983Z', NULL, '2026-11-17T02:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('de2f05da-d595-48f1-a079-a26324d8941d', 'REQ-2026-0229', 'Rania', 'Khelifi', '0661269231', '+213661269231', 'rania.khelifi29@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '56', 'Djanet Ouest', 'pending', NULL, NULL, NULL, NULL, '2026-11-04T01:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('090ea6b0-e88b-4a63-a69c-859b6dd29b98', 'REQ-2026-0230', 'Nour', 'Boudiaf', '0662269970', '+213662269970', 'nour.boudiaf30@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '57', 'El M''Ghair Centre', 'preorder_redirected', NULL, NULL, NULL, 'Redirigé vers motobladi.dz pour précommande', '2026-10-22T00:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('518a69e2-2dc3-4c65-a662-fe3c304a9fc8', 'REQ-2026-0231', 'Selma', 'Hadj', '0770270709', '+213770270709', 'selma.hadj31@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '58', 'El Meniaa Ouest', 'pending', NULL, NULL, NULL, NULL, '2026-11-17T23:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('8d6ce695-1d0d-4712-a8ff-805a7929fef6', 'REQ-2026-0232', 'Ines', 'Guendouz', '0771271448', '+213771271448', 'ines.guendouz32@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '01', 'Reggane', 'available_notified', 'a1151a33-c181-4f15-ae21-d1143083fe9b', '2026-11-18T14:48:55.983Z', NULL, NULL, '2026-11-04T22:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('073b3e4e-789a-4c4e-ab16-6dfdc9e60673', 'REQ-2026-0233', 'Chaima', 'Benaissa', '0772272187', '+213772272187', 'chaima.benaissa33@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '02', 'Oued Fodda', 'pending', NULL, NULL, NULL, NULL, '2026-10-22T21:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('0e09d4e4-b143-4526-a4e2-38c51a9b1aad', 'REQ-2026-0234', 'Lynda', 'Mokhtari', '0550272926', '+213550272926', 'lynda.mokhtari34@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '03', 'Laghouat Centre', 'fulfilled', 'a1151a33-c181-4f15-ae21-d1143083fe9b', '2026-11-11T14:48:55.983Z', '2026-11-19T14:48:55.983Z', NULL, '2026-11-18T20:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('99ea9896-91ed-429b-a3cb-ea43308ab664', 'REQ-2026-0235', 'Fouad', 'Tebboune', '0551273665', '+213551273665', 'fouad.tebboune35@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '04', 'Oum El Bouaghi Ouest', 'pending', NULL, NULL, NULL, NULL, '2026-11-05T19:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('bba9b613-e773-418e-a2ed-cf1eaf046bd7', 'REQ-2026-0236', 'Khaled', 'Mebarki', '0552274404', '+213552274404', 'khaled.mebarki36@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '05', 'Batna Ville', 'available_notified', 'd6c883f8-c7df-4b55-a711-25fcc9a5cb13', '2026-11-18T14:48:55.983Z', NULL, NULL, '2026-10-23T18:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('9d32070e-f608-4d89-a89c-06f205ae1f63', 'REQ-2026-0237', 'Tarek', 'Gherbi', '0554275143', '+213554275143', 'tarek.gherbi37@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '06', 'Sidi Aïch', 'pending', NULL, NULL, NULL, NULL, '2026-11-19T17:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('b67878d5-f04e-45ff-a72c-d0f4e2bd7faf', 'REQ-2026-0238', 'Hichem', 'Amrani', '0555275882', '+213555275882', 'hichem.amrani38@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '07', 'Tolga', 'pending', NULL, NULL, NULL, NULL, '2026-11-06T16:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('79606c86-a40b-4ba9-a0e5-d0102ed8e685', 'REQ-2026-0239', 'Moncef', 'Chabane', '0560276621', '+213560276621', 'moncef.chabane39@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '08', 'Taghit', 'pending', NULL, NULL, NULL, NULL, '2026-10-24T15:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('468907c3-ad31-4fd6-abbf-ee76ff02667f', 'REQ-2026-0240', 'Mohamed', 'Benali', '0561277360', '+213561277360', 'mohamed.benali40@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '09', 'Blida Centre', 'preorder_redirected', NULL, NULL, NULL, 'Redirigé vers motobladi.dz pour précommande', '2026-11-21T14:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('931d79ea-2ad8-4ea7-ae68-352d483e4ef3', 'REQ-2026-0241', 'Amine', 'Khelifi', '0660278099', '+213660278099', 'amine.khelifi41@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '10', 'Lakhdaria', 'pending', NULL, NULL, NULL, NULL, '2026-11-08T13:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('ee9a8086-6279-4709-a9a8-d5a20bd3badb', 'REQ-2026-0242', 'Youcef', 'Boudiaf', '0661278838', '+213661278838', 'youcef.boudiaf42@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '11', 'Tamanrasset Centre', 'pending', NULL, NULL, NULL, NULL, '2026-10-26T12:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('48ce0cea-5118-449e-a94d-adb416566f4b', 'REQ-2026-0243', 'Karim', 'Hadj', '0662279577', '+213662279577', 'karim.hadj43@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '12', 'Tébessa', 'pending', NULL, NULL, NULL, NULL, '2026-10-13T11:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('ca8c9d16-2342-4523-a060-adca2eeba478', 'REQ-2026-0244', 'Walid', 'Guendouz', '0770280316', '+213770280316', 'walid.guendouz44@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '13', 'Tlemcen Ville', 'available_notified', '6676117f-09a1-4fe6-ad91-c5be0787fe7a', '2026-11-18T14:48:55.983Z', NULL, NULL, '2026-11-09T10:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('02751331-d990-4381-a2f2-8e744fa242bf', 'REQ-2026-0245', 'Sofiane', 'Benaissa', '0771281055', '+213771281055', 'sofiane.benaissa45@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '14', 'Frenda', 'pending', NULL, NULL, NULL, NULL, '2026-10-27T09:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('ff7dd539-b42b-4c71-a1ab-85a32c5a8ef2', 'REQ-2026-0246', 'Bilal', 'Mokhtari', '0772281794', '+213772281794', 'bilal.mokhtari46@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '15', 'Draa Ben Khedda', 'fulfilled', 'c13d2978-83d8-49b3-a4fe-93e92b1fc07f', '2026-11-11T14:48:55.983Z', '2026-11-19T14:48:55.983Z', NULL, '2026-10-14T08:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('dbda0be4-99c1-4abc-aa4e-bf1b08f51294', 'REQ-2026-0247', 'Yacine', 'Tebboune', '0550282533', '+213550282533', 'yacine.tebboune47@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '16', 'Bab El Oued', 'pending', NULL, NULL, NULL, NULL, '2026-11-10T07:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('a93ad462-cf45-4caa-a140-96e338d2ab58', 'REQ-2026-0248', 'Ryad', 'Mebarki', '0551283272', '+213551283272', 'ryad.mebarki48@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '17', 'Hassi Bahbah', 'available_notified', 'dafa8f2d-2471-4a5d-a0c6-24cd172fa668', '2026-11-18T14:48:55.983Z', NULL, NULL, '2026-10-28T06:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('dd2bc93f-005a-4841-acd5-0c4a30c7c1dd', 'REQ-2026-0249', 'Mehdi', 'Gherbi', '0552284011', '+213552284011', 'mehdi.gherbi49@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '18', 'Jijel', 'pending', NULL, NULL, NULL, NULL, '2026-10-15T05:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('8327cebe-0bb6-4e4f-ae27-35609b212e71', 'REQ-2026-0250', 'Hamza', 'Amrani', '0554284750', '+213554284750', 'hamza.amrani0@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '19', 'Sétif Ville', 'preorder_redirected', NULL, NULL, NULL, 'Redirigé vers motobladi.dz pour précommande', '2026-11-11T04:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('5017f4d0-c53e-41f1-ac10-65e3212d9de3', 'REQ-2026-0251', 'Farouk', 'Chabane', '0555285489', '+213555285489', 'farouk.chabane1@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '20', 'Aïn El Hadjar', 'pending', NULL, NULL, NULL, NULL, '2026-10-29T03:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('b754d971-6716-490a-aa1e-4f97460c04c8', 'REQ-2026-0252', 'Abdelkader', 'Benali', '0560286228', '+213560286228', 'abdelkader.benali2@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '21', 'Skikda', 'fulfilled', '26d2ced3-df2f-4678-a147-084eb4c49e74', '2026-11-11T14:48:55.983Z', '2026-11-19T14:48:55.983Z', NULL, '2026-10-16T02:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('8b3cdd34-4849-499e-ae3a-e4d444ef605a', 'REQ-2026-0253', 'Omar', 'Khelifi', '0561286967', '+213561286967', 'omar.khelifi3@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '22', 'Telagh', 'pending', NULL, NULL, NULL, NULL, '2026-11-12T01:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('e7170568-e00c-4abd-ad58-d0cd44e0a3b2', 'REQ-2026-0254', 'Mustapha', 'Boudiaf', '0660287706', '+213660287706', 'mustapha.boudiaf4@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '23', 'Sidi Amar', 'pending', NULL, NULL, NULL, NULL, '2026-10-30T00:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('4f1d4ce9-f7e7-447d-aa00-f922c91e34f6', 'REQ-2026-0255', 'Lotfi', 'Hadj', '0661288445', '+213661288445', 'lotfi.hadj5@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '24', 'Guelma', 'pending', NULL, NULL, NULL, NULL, '2026-10-16T23:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('716f116c-be74-4bc5-a393-9becd3308b63', 'REQ-2026-0256', 'Samy', 'Guendouz', '0662289184', '+213662289184', 'samy.guendouz6@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '25', 'El Khroub', 'available_notified', '256f8a1b-b5e7-4991-a728-02b869440477', '2026-11-18T14:48:55.983Z', NULL, NULL, '2026-11-12T22:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('da521b1c-8289-4c65-afba-657ae40aaf00', 'REQ-2026-0257', 'Anis', 'Benaissa', '0770289923', '+213770289923', 'anis.benaissa7@gmail.com', 'd6fc9248-c0f0-453b-a919-2ac81f7615a1', '26', 'Ksar El Boukhari', 'pending', NULL, NULL, NULL, NULL, '2026-10-30T21:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('8a2743e0-78cb-41d3-ae97-830632a0881e', 'REQ-2026-0258', 'Zinedine', 'Mokhtari', '0771290662', '+213771290662', 'zinedine.mokhtari8@gmail.com', '6e9fb6d7-fae5-4c4c-aa98-22723f9a733a', '27', 'Mostaganem', 'fulfilled', 'f4218e19-c304-4edb-aada-99dcd48a5841', '2026-11-11T14:48:55.983Z', '2026-11-19T14:48:55.983Z', NULL, '2026-10-17T20:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('1c800d95-8344-4386-ac69-aa2a1a3bbf09', 'REQ-2026-0259', 'Islam', 'Tebboune', '0772291401', '+213772291401', 'islam.tebboune9@gmail.com', 'efe00453-2df4-467f-a177-0484ee609660', '28', 'Boussaâda', 'pending', NULL, NULL, NULL, NULL, '2026-11-13T19:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)
VALUES ('864d7850-ff0c-4600-a0fd-a831b41eddaa', 'REQ-2026-0260', 'Oussama', 'Mebarki', '0550292140', '+213550292140', 'oussama.mebarki10@gmail.com', '6a3c1ffa-2d7d-4809-a675-14cb75d4033f', '29', 'Sig', 'preorder_redirected', NULL, NULL, NULL, 'Redirigé vers motobladi.dz pour précommande', '2026-10-31T18:48:55.983Z')
ON CONFLICT (reference) DO NOTHING;
ALTER TABLE customer_requests ENABLE TRIGGER check_customer_request_limit;
COMMIT;
