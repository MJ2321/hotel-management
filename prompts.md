https://v0.app/chat/hotel-management-system-pyPe6hJQFau?ref=DJ8DTE

chat gpt:

Napisz prompt do llm-a v0 ktory stworzy mi aplikacje internetowa w next.js w oparciu o typescript, ktorej budowa bedzie opierac sie na komponentach z shadcn, zaimplementuj takze baze danych na module prisma. 
Aplikacja ma być systemem do zarządzania hotelami, jest w nim opcja rezerwacji, zarzadzania rezerwacjami jako admin, obsluga personelu, pokoji itp, aplikacja ma wygladac schludnie i byc prosta w obsludze.
Pamietaj o dodaniu endpointow, stylizuj w tailwind

V0:
Jesteś doświadczonym full-stack developerem. Wygeneruj kompletną aplikację internetową typu Hotel Management System.

Stack technologiczny

Next.js (App Router)

TypeScript

Tailwind CSS

shadcn/ui (Button, Card, Table, Form, Dialog, Sheet, Badge, Tabs)

Prisma ORM (z relacyjną bazą danych)

Opis aplikacji

Aplikacja służy do zarządzania hotelami. Umożliwia:

rezerwację pokoi przez użytkowników

zarządzanie rezerwacjami przez administratora

obsługę personelu hotelowego

zarządzanie pokojami i ich dostępnością

Interfejs powinien być schludny, minimalistyczny, intuicyjny i prosty w obsłudze.

Funkcjonalności
Użytkownik (klient)

przeglądanie listy dostępnych pokoi

filtrowanie pokoi (liczba osób, cena, dostępność)

szczegóły pokoju

rezerwacja pokoju (daty, liczba osób, dane kontaktowe)

podgląd własnych rezerwacji

Administrator

panel admina

zarządzanie pokojami (CRUD)

zarządzanie rezerwacjami (zatwierdzanie, anulowanie)

zarządzanie personelem hotelu

podgląd dostępności pokoi

Baza danych (Prisma)

Zaimplementuj Prisma schema z relacjami:

User (role: USER / ADMIN / STAFF)

Room

Reservation

Staff

Uwzględnij:

relacje między pokojami a rezerwacjami

status rezerwacji (PENDING / CONFIRMED / CANCELLED)

dostępność pokoi na podstawie dat

Backend / API

Zaimplementuj endpointy API w Next.js (/app/api)

Endpointy do:

rezerwacji pokoju

pobierania dostępnych pokoi

zarządzania pokojami

zarządzania rezerwacjami

obsługi personelu

Stosuj:

walidację danych

czytelne response’y JSON

Frontend / UI

Buduj interfejs wyłącznie z komponentów shadcn/ui

Styluj wyłącznie przy użyciu Tailwind CSS

Layout responsywny (desktop + mobile)

Prosty, nowoczesny wygląd:

jasne tło

stonowana kolorystyka

czytelna typografia

Architektura

Korzystaj z Server Components tam, gdzie to możliwe

Formularze i interakcje jako Client Components

Czytelna struktura katalogów

Rozdziel logikę UI, API i bazy danych

Dodatkowe wymagania

Mockowe uwierzytelnianie (role użytkowników)

Seed przykładowych danych (Prisma seed)

Komentarze w kluczowych miejscach

Na końcu zaproponuj strukturę folderów projektu

Wygeneruj kod w sposób spójny i produkcyjnej jakości.
