BEGIN;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('001c8983-4d04-4dbe-a844-ba553c3d3ca8', 'admin@vms.dz', 'super_admin', 'Ahmed', 'Benali', '0560112233', '16', TRUE, '2026-01-01T08:00:00Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('c4759690-0633-4618-a18c-6bd17c518a4a', 'alger@vms.dz', 'showroom_owner', 'Karim', 'Belkacem', '0555123456', '16', TRUE, '2026-01-10T09:00:00Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('85e68863-2138-4f3a-ad17-7d8456f9e46e', 'oran@vms.dz', 'showroom_owner', 'Yacine', 'Mansouri', '0551987654', '31', TRUE, '2026-01-15T09:00:00Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('0a255fd4-0cb2-4646-aaa8-7ec84d8852ed', 'amine.dahmani@gmail.com', 'customer', 'Amine', 'Dahmani', '0550123456', '16', TRUE, '2026-02-10T10:30:00Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('756d679c-4e15-4497-a97c-4087bf73c832', 'contact.ouedghir@vms.dz', 'showroom_owner', 'Siège', 'Oued Ghir', '034 18 50 00', '06', TRUE, '2025-12-14T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('3d08bdc4-1d12-40ad-ab90-f6ff8c34b5ac', 'contact.akbou@vms.dz', 'showroom_owner', 'Showroom', 'Akbou', '034 35 12 40', '06', TRUE, '2025-12-15T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('d59bc16f-c7e7-4555-a220-bfca079d1de4', 'contact.tazmalt@vms.dz', 'showroom_owner', 'Agence', 'Tazmalt', '034 38 77 12', '06', TRUE, '2025-12-16T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('e7855600-28bf-43df-aa30-4396ef419dbe', 'contact.relizane@vms.dz', 'showroom_owner', 'Pôle', 'Relizane', '046 92 10 30', '48', TRUE, '2025-12-17T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('1e76aed1-81ac-4fc7-a232-3e1b4105251f', 'contact.ouedrhiou@vms.dz', 'showroom_owner', 'Agence', 'Oued Rhiou', '046 95 44 20', '48', TRUE, '2025-12-18T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('31cdbd8c-3f26-4abf-a863-463171148686', 'contact.bouzarah@vms.dz', 'showroom_owner', 'Moto', 'Bouzaréah', '023 18 90 20', '16', TRUE, '2025-12-19T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('b7fbec64-1940-48c8-afdc-1c0d110601b6', 'contact.husseindey@vms.dz', 'showroom_owner', 'Showroom', 'Hussein Dey', '023 77 45 10', '16', TRUE, '2025-12-20T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('396eee0b-62e6-4250-a7fa-59d6687fb5b0', 'contact.darelbeda@vms.dz', 'showroom_owner', 'Dar', 'Dar El Beïda', '023 85 22 10', '16', TRUE, '2025-12-21T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('557dc273-9489-4cdc-aac6-297af60e88d6', 'contact.chraga@vms.dz', 'showroom_owner', 'Showroom', 'Chéraga', '023 36 40 80', '16', TRUE, '2025-12-22T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('1292c4d3-b1b1-4b2f-a60b-1d31b16b5e73', 'contact.kouba@vms.dz', 'showroom_owner', 'Agence', 'Kouba', '023 71 19 00', '16', TRUE, '2025-12-23T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('b405d592-698b-4411-a972-57b0274e723f', 'contact.birtouta@vms.dz', 'showroom_owner', 'Birtouta', 'Birtouta', '023 58 77 00', '16', TRUE, '2025-12-24T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('007a0184-d024-489c-acd2-9a20b3074e01', 'contact.rouba@vms.dz', 'showroom_owner', 'Showroom', 'Rouïba', '023 86 33 11', '16', TRUE, '2025-12-25T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('8592199d-47aa-47d0-ab02-87fc09753c5c', 'contact.babeloued@vms.dz', 'showroom_owner', 'Bab', 'Bab El Oued', '023 94 10 50', '16', TRUE, '2025-12-26T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('eb405e17-f561-45c3-a9e7-2a8f69ed8df4', 'contact.draria@vms.dz', 'showroom_owner', 'Agence', 'Draria', '023 26 44 99', '16', TRUE, '2025-12-27T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('ab4db2d8-37ba-48a4-ad57-98c7a80d92ce', 'contact.zralda@vms.dz', 'showroom_owner', 'Zéralda', 'Zéralda', '023 32 80 10', '16', TRUE, '2025-12-28T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('5ed3e55f-9494-4c77-a0e9-d0194f479a49', 'contact.essenia@vms.dz', 'showroom_owner', 'Showroom', 'Es-Senia', '041 51 22 90', '31', TRUE, '2025-12-14T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('fbc18189-0251-40e5-ade4-9c77b89f15a5', 'contact.bireldjir@vms.dz', 'showroom_owner', 'Bir', 'Bir El Djir', '041 62 80 00', '31', TRUE, '2025-12-15T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('8258c3b0-e16e-4e44-a008-dc2c5faa78b8', 'contact.arzew@vms.dz', 'showroom_owner', 'Agence', 'Arzew', '041 47 33 10', '31', TRUE, '2025-12-16T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('51c3e9f2-c16e-4ad5-ae6e-b3f55c2f04c2', 'contact.anelturk@vms.dz', 'showroom_owner', 'Aïn', 'Aïn El Turk', '041 39 88 40', '31', TRUE, '2025-12-17T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('25757ad6-514c-4c71-ae5d-f5ae688fbc72', 'contact.alimendjeli@vms.dz', 'showroom_owner', 'Showroom', 'Ali Mendjeli', '031 67 40 10', '25', TRUE, '2025-12-18T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('d2abf4cb-fb94-4beb-a273-2fcfdb06f959', 'contact.elkhroub@vms.dz', 'showroom_owner', 'Agence', 'El Khroub', '031 96 12 30', '25', TRUE, '2025-12-19T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('6cbe9ad1-4879-4b62-a86f-45b5352ec749', 'contact.constantinecentre@vms.dz', 'showroom_owner', 'Constantine', 'Constantine Centre', '031 92 45 80', '25', TRUE, '2025-12-20T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('18e81fa2-180c-44e5-acb9-36c2bf75b414', 'contact.stifville@vms.dz', 'showroom_owner', 'Showroom', 'Sétif Ville', '036 84 50 20', '19', TRUE, '2025-12-21T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('96d12c93-b1f0-416b-a64f-3b888b1dc988', 'contact.eleulma@vms.dz', 'showroom_owner', 'El', 'El Eulma', '036 87 11 40', '19', TRUE, '2025-12-22T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('eb6a9bfd-25e9-459d-adf8-53bab65d77b9', 'contact.anoulmene@vms.dz', 'showroom_owner', 'Aïn', 'Aïn Oulmene', '036 72 30 10', '19', TRUE, '2025-12-23T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('86cc4016-8e00-436a-afb6-df89a35ff371', 'contact.blidacentre@vms.dz', 'showroom_owner', 'Showroom', 'Blida Centre', '025 31 40 60', '09', TRUE, '2025-12-24T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('a902e570-c614-4445-a0b1-08153917df79', 'contact.boufarik@vms.dz', 'showroom_owner', 'Boufarik', 'Boufarik', '025 47 20 80', '09', TRUE, '2025-12-25T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('139d435b-8901-44de-a998-f4a54d278a2b', 'contact.ouledyach@vms.dz', 'showroom_owner', 'Ouled', 'Ouled Yaïch', '025 22 15 90', '09', TRUE, '2025-12-26T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('de5573d3-62d0-4fe6-af46-d76c8795812e', 'contact.tiziouzou@vms.dz', 'showroom_owner', 'Showroom', 'Tizi Ouzou', '026 19 22 30', '15', TRUE, '2025-12-27T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('9ce7b928-1a8d-4669-a94e-91f3f95b8228', 'contact.azazga@vms.dz', 'showroom_owner', 'Agence', 'Azazga', '026 34 10 20', '15', TRUE, '2025-12-28T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('18a0a186-6749-4840-a67a-889feb1894ff', 'contact.draabenkhedda@vms.dz', 'showroom_owner', 'Draa', 'Draa Ben Khedda', '026 25 40 10', '15', TRUE, '2025-12-14T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('7d861b5d-86b0-454a-a08c-7a38a076d39f', 'contact.batnaville@vms.dz', 'showroom_owner', 'Showroom', 'Batna Ville', '033 86 50 20', '05', TRUE, '2025-12-15T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('6854bcea-1715-404a-a725-c8132598b6b8', 'contact.barika@vms.dz', 'showroom_owner', 'Agence', 'Barika', '033 78 30 15', '05', TRUE, '2025-12-16T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('94e3eb45-5cd8-4a2e-a650-4903019c5716', 'contact.annabacentre@vms.dz', 'showroom_owner', 'Showroom', 'Annaba Centre', '038 45 60 70', '23', TRUE, '2025-12-17T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('ad8bbc9d-f585-4692-a5d4-441a066da5dd', 'contact.elbouni@vms.dz', 'showroom_owner', 'El', 'El Bouni', '038 52 14 30', '23', TRUE, '2025-12-18T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('16ecb8f7-0ac1-40af-ac92-63c7311a99ad', 'contact.tlemcenville@vms.dz', 'showroom_owner', 'Showroom', 'Tlemcen Ville', '043 27 80 90', '13', TRUE, '2025-12-19T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('50c94048-681e-4370-a339-21dc197fd83b', 'contact.maghnia@vms.dz', 'showroom_owner', 'Agence', 'Maghnia', '043 31 40 20', '13', TRUE, '2025-12-20T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('5058d423-4c8a-438b-a512-e302e8117fa4', 'contact.chlefville@vms.dz', 'showroom_owner', 'Showroom', 'Chlef Ville', '027 77 30 40', '02', TRUE, '2025-12-21T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('6d0c40db-d4d7-445c-aaab-2a89be0b479f', 'contact.tns@vms.dz', 'showroom_owner', 'Ténès', 'Ténès', '027 76 12 80', '02', TRUE, '2025-12-22T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('05929173-436b-4213-acf4-cda809468f3c', 'contact.boumerds@vms.dz', 'showroom_owner', 'Boumerdès', 'Boumerdès', '024 81 50 60', '35', TRUE, '2025-12-23T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('f088e389-8740-4766-ac3d-6868361f5ccd', 'contact.khemiselkhechna@vms.dz', 'showroom_owner', 'Khemis', 'Khemis El Khechna', '024 89 20 10', '35', TRUE, '2025-12-24T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('82a3e814-9596-4356-ab98-aa99885f9507', 'contact.tipaza@vms.dz', 'showroom_owner', 'Tipaza', 'Tipaza', '024 49 10 30', '42', TRUE, '2025-12-25T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('016ccf00-a69a-461b-a8cd-b550c0f9f88f', 'contact.kola@vms.dz', 'showroom_owner', 'Koléa', 'Koléa', '024 38 45 20', '42', TRUE, '2025-12-26T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('786eb900-22de-4643-a2a2-c9caf141f0ca', 'contact.bouira@vms.dz', 'showroom_owner', 'Showroom', 'Bouira', '026 93 40 50', '10', TRUE, '2025-12-27T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('18d24942-7a4d-44b5-a644-a846242b00ec', 'contact.lakhdaria@vms.dz', 'showroom_owner', 'Lakhdaria', 'Lakhdaria', '026 88 12 30', '10', TRUE, '2025-12-28T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('fbcee0f0-3c57-462a-a826-8bd8d5197457', 'contact.bordjbouarrridj@vms.dz', 'showroom_owner', 'Showroom', 'Bordj Bou Arréridj', '035 68 20 40', '34', TRUE, '2025-12-14T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('1ca332e6-3ee6-4947-a5c0-a4f9fa0e0bd4', 'contact.raseloued@vms.dz', 'showroom_owner', 'Agence', 'Ras El Oued', '035 74 15 20', '34', TRUE, '2025-12-15T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('a2c61b5c-0a6f-4f17-af5f-97037130c4d3', 'contact.djelfa@vms.dz', 'showroom_owner', 'Showroom', 'Djelfa', '027 87 30 10', '17', TRUE, '2025-12-16T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('d65ea827-493b-4a35-a5f5-bc400adfb4fc', 'contact.anoussera@vms.dz', 'showroom_owner', 'Aïn', 'Aïn Oussera', '027 82 14 30', '17', TRUE, '2025-12-17T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('1a16f3de-dff0-480b-af39-53ce46b0da86', 'contact.biskra@vms.dz', 'showroom_owner', 'Showroom', 'Biskra', '033 74 20 80', '07', TRUE, '2025-12-18T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('abeb46ba-9784-4f65-a52d-c1c3919422fe', 'contact.tolga@vms.dz', 'showroom_owner', 'Tolga', 'Tolga', '033 58 11 90', '07', TRUE, '2025-12-19T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('efaa825c-78bd-49bb-a8d6-add53eb55f07', 'contact.msila@vms.dz', 'showroom_owner', 'Showroom', 'M''Sila', '035 55 40 20', '28', TRUE, '2025-12-20T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('fc2c5b58-1ab9-4b6c-abaa-6e0bc4207244', 'contact.boussada@vms.dz', 'showroom_owner', 'Boussaâda', 'Boussaâda', '035 52 18 30', '28', TRUE, '2025-12-21T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('2416a231-7e85-4635-ab68-71683d4e89f7', 'contact.mascara@vms.dz', 'showroom_owner', 'Showroom', 'Mascara', '045 80 12 30', '29', TRUE, '2025-12-22T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('9237860c-9d89-4931-a176-7c8ab52d78df', 'contact.tighennif@vms.dz', 'showroom_owner', 'Tighennif', 'Tighennif', '045 83 24 50', '29', TRUE, '2025-12-23T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('5fc994ca-32f0-494a-afb5-8dc4175ee2b0', 'contact.jijel@vms.dz', 'showroom_owner', 'Showroom', 'Jijel', '034 50 14 20', '18', TRUE, '2025-12-24T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('7a17608c-6b64-427b-a58d-bea0891b790d', 'contact.taher@vms.dz', 'showroom_owner', 'Taher', 'Taher', '034 48 30 10', '18', TRUE, '2025-12-25T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('3d8abc13-9b56-48d8-ad4e-b4a835086bb1', 'contact.skikda@vms.dz', 'showroom_owner', 'Showroom', 'Skikda', '038 75 30 40', '21', TRUE, '2025-12-26T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('7317d4df-5cc6-4b93-a068-09ec008c5f45', 'contact.elharrouch@vms.dz', 'showroom_owner', 'El', 'El Harrouch', '038 72 15 20', '21', TRUE, '2025-12-27T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('c57403b8-d666-43fc-ae24-7ae27aa01dbd', 'contact.mda@vms.dz', 'showroom_owner', 'Showroom', 'Médéa', '025 58 20 30', '26', TRUE, '2025-12-28T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('6beb41ef-67b7-41f1-a706-fcd248e6f89b', 'contact.berrouaghia@vms.dz', 'showroom_owner', 'Berrouaghia', 'Berrouaghia', '025 77 12 40', '26', TRUE, '2025-12-14T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('3492540d-124c-4f7c-a3e8-7c0bb039232e', 'contact.mostaganem@vms.dz', 'showroom_owner', 'Showroom', 'Mostaganem', '045 21 40 50', '27', TRUE, '2025-12-15T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('313b6c2a-90a6-4628-af9f-bde7d3e4e6cc', 'contact.antedeles@vms.dz', 'showroom_owner', 'Aïn', 'Aïn Tedeles', '045 33 18 20', '27', TRUE, '2025-12-16T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('e14299e0-97c5-451b-ab29-636e22f1bf60', 'contact.ouargla@vms.dz', 'showroom_owner', 'Showroom', 'Ouargla', '029 71 80 90', '30', TRUE, '2025-12-17T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('e4c1e991-4c2f-4c15-a178-1aaf24946118', 'contact.hassimessaoud@vms.dz', 'showroom_owner', 'Hassi', 'Hassi Messaoud', '029 73 40 10', '30', TRUE, '2025-12-18T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('c880fbf4-4109-48f4-a492-63e5d785ded7', 'contact.andefla@vms.dz', 'showroom_owner', 'Showroom', 'Aïn Defla', '027 60 18 20', '44', TRUE, '2025-12-19T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('54febf93-2c82-4ff3-affc-2edfa9c8aba7', 'contact.khemismiliana@vms.dz', 'showroom_owner', 'Khemis', 'Khemis Miliana', '027 66 45 10', '44', TRUE, '2025-12-20T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('2cddf62f-b2e8-4376-a02d-2ae5d9c4bda5', 'contact.sidibelabbs@vms.dz', 'showroom_owner', 'Showroom', 'Sidi Bel Abbès', '048 54 20 30', '22', TRUE, '2025-12-21T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('c75c6ecc-5002-4142-ad7b-23b9aeb8c102', 'contact.tiaret@vms.dz', 'showroom_owner', 'Showroom', 'Tiaret', '046 42 15 80', '14', TRUE, '2025-12-22T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('8fd024d7-7dc9-4035-a0f9-95c6d39eca46', 'contact.sada@vms.dz', 'showroom_owner', 'Showroom', 'Saïda', '048 47 30 10', '20', TRUE, '2025-12-23T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('fe646314-ccdb-4a50-ad3c-e9ecbd09ef5c', 'contact.antmouchent@vms.dz', 'showroom_owner', 'Showroom', 'Aïn Témouchent', '043 60 25 40', '46', TRUE, '2025-12-24T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('0ce35571-9bf7-45f3-ae66-97c05a75aab6', 'contact.ghardaa@vms.dz', 'showroom_owner', 'Showroom', 'Ghardaïa', '029 88 40 20', '47', TRUE, '2025-12-25T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('24e6962a-cc0b-4d32-a45a-80cd54ec4681', 'contact.eloued@vms.dz', 'showroom_owner', 'Showroom', 'El Oued', '032 21 50 30', '39', TRUE, '2025-12-26T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('c0ed58ed-df4b-4aa7-a609-c203d9405b73', 'contact.touggourt@vms.dz', 'showroom_owner', 'Showroom', 'Touggourt', '029 67 12 40', '55', TRUE, '2025-12-27T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('2abd0993-3711-438b-a4f0-74cfd2afee0f', 'contact.tbessa@vms.dz', 'showroom_owner', 'Showroom', 'Tébessa', '037 49 30 10', '12', TRUE, '2025-12-28T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('9150c39b-c21c-435e-aa86-e0d2243c2bbb', 'contact.guelma@vms.dz', 'showroom_owner', 'Showroom', 'Guelma', '037 20 45 60', '24', TRUE, '2025-12-14T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('134cbba2-04aa-4a1c-ab8a-2238bb362628', 'contact.khenchela@vms.dz', 'showroom_owner', 'Showroom', 'Khenchela', '032 32 10 80', '40', TRUE, '2025-12-15T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('47ff9557-3870-4876-a743-51c515a1164d', 'contact.soukahras@vms.dz', 'showroom_owner', 'Showroom', 'Souk Ahras', '037 32 80 40', '41', TRUE, '2025-12-16T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('8f5f3bd2-cc44-4f6a-abe5-ceba49099ee0', 'contact.mila@vms.dz', 'showroom_owner', 'Showroom', 'Mila', '031 57 20 10', '43', TRUE, '2025-12-17T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)
VALUES ('ed20266a-5fe9-4247-a047-4780aaca29d2', 'contact.oumelbouaghi@vms.dz', 'showroom_owner', 'Showroom', 'Oum El Bouaghi', '032 42 15 30', '04', TRUE, '2025-12-18T23:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
COMMIT;
