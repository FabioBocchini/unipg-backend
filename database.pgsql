--
-- PostgreSQL database dump
--

-- Dumped from database version 11.4
-- Dumped by pg_dump version 11.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: stato; Type: DOMAIN; Schema: public; Owner: postgres
--

CREATE DOMAIN public.stato AS character varying(15)
	CONSTRAINT stato_check CHECK (((VALUE)::text = ANY ((ARRAY['Accettato'::character varying, 'Waiting'::character varying])::text[])));


ALTER DOMAIN public.stato OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: corso; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.corso (
    id_corso character varying(10) NOT NULL,
    professore character varying(10),
    nome character varying(50),
    canale character varying(20),
    cfu integer NOT NULL
);


ALTER TABLE public.corso OWNER TO postgres;

--
-- Name: esame; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.esame (
    id_corso character varying(10) NOT NULL,
    matricola integer NOT NULL,
    voto integer NOT NULL,
    dataesame date,
    statoesame public.stato NOT NULL
);


ALTER TABLE public.esame OWNER TO postgres;

--
-- Name: professore; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.professore (
    id character varying(10) NOT NULL,
    nome character varying(20),
    cognome character varying(20),
    email character varying(50) NOT NULL,
    password character varying(100) NOT NULL
);


ALTER TABLE public.professore OWNER TO postgres;

--
-- Name: studente; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.studente (
    matricola integer NOT NULL,
    nome character varying(20),
    cognome character varying(20),
    email character varying(50) NOT NULL,
    password character varying(100) NOT NULL
);


ALTER TABLE public.studente OWNER TO postgres;

--
-- Data for Name: corso; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.corso (id_corso, professore, nome, canale, cfu) FROM stdin;
PR001	ST001	Protocolli	INF001	6
AR001	OG001	ArchitetturaReti	INF001	6
BD001	RG001	Basi di dati	INF001	9
AE001	AC001	Architettura degli elaboratori	INF001	12
LF001	AC001	Linguaggi formali	INF001	6
RV001\n	OG001	Sistemi di realtà virtuale	INF001	6
SA001	ST001	Sistemi aperti e distribuiti	INF001	6
\.


--
-- Data for Name: esame; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.esame (id_corso, matricola, voto, dataesame, statoesame) FROM stdin;
SA001	290948	25	2019-07-19	Accettato
BD001	290948	30	2019-01-09	Waiting
AR001	290948	27	2019-02-07	Waiting
SA001	293872	30	2019-07-19	Waiting
\.


--
-- Data for Name: professore; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.professore (id, nome, cognome, email, password) FROM stdin;
ST001	Sergio	Tasso	sergio.tasso@unipg.it	$2a$10$RKtb/.pMT/nWx1J5utYkfO4SsHp8tAZwZq9v9OzG0fsIQWMXeG5a6
OG001	Osvaldo	Gervasi	osvaldo.gervasi@unipg.it	$2a$10$RKtb/.pMT/nWx1J5utYkfO4SsHp8tAZwZq9v9OzG0fsIQWMXeG5a6
RG001	Raffaella	Gentilini	raffaella.gentilini@unipg.it	$2a$10$RKtb/.pMT/nWx1J5utYkfO4SsHp8tAZwZq9v9OzG0fsIQWMXeG5a6
AC001	Arturo	Carpi	arturo.carpi@unipg.it	$2a$10$RKtb/.pMT/nWx1J5utYkfO4SsHp8tAZwZq9v9OzG0fsIQWMXeG5a6
\.


--
-- Data for Name: studente; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.studente (matricola, nome, cognome, email, password) FROM stdin;
290948	Fabio	Bocchini	fabio.bocchini@studenti.unipg.it	$2a$10$RKtb/.pMT/nWx1J5utYkfO4SsHp8tAZwZq9v9OzG0fsIQWMXeG5a6
293872	Ludovico	Dziecielski	ludovico.dziecielski@studenti.unipg.it	$2a$10$RKtb/.pMT/nWx1J5utYkfO4SsHp8tAZwZq9v9OzG0fsIQWMXeG5a6
288773	Riccardo	Lucarini	riccardo.lucarini@stuenti.unipg.it	$2a$10$RKtb/.pMT/nWx1J5utYkfO4SsHp8tAZwZq9v9OzG0fsIQWMXeG5a6
289073	Guglielmo	Sisti	guglielmo.sisti@studenti.unipg.it	$2a$10$cdx5qPs7iyFVCOyiNwzI9uBPYSTGQdv9zGQqCCEvtmE5SYS/IVUaW
291404	Manuel	Chiodi	manuel.chiodi@studenti.unipg.it	$2a$10$HiCUKCyFZD3.yyKLj.APL.eR9x4Ku0FBx8KuHfW.pSXUX217MbPza
\.


--
-- Name: corso corso_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.corso
    ADD CONSTRAINT corso_pkey PRIMARY KEY (id_corso);


--
-- Name: esame esame_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.esame
    ADD CONSTRAINT esame_pkey PRIMARY KEY (id_corso, matricola);


--
-- Name: professore professore_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.professore
    ADD CONSTRAINT professore_pkey PRIMARY KEY (id);


--
-- Name: studente studente_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.studente
    ADD CONSTRAINT studente_pkey PRIMARY KEY (matricola);


--
-- Name: corso corso_professore_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.corso
    ADD CONSTRAINT corso_professore_fkey FOREIGN KEY (professore) REFERENCES public.professore(id);


--
-- Name: esame esame_id_corso_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.esame
    ADD CONSTRAINT esame_id_corso_fkey FOREIGN KEY (id_corso) REFERENCES public.corso(id_corso);


--
-- Name: esame esame_matricola_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.esame
    ADD CONSTRAINT esame_matricola_fkey FOREIGN KEY (matricola) REFERENCES public.studente(matricola);


--
-- PostgreSQL database dump complete
--

