niort = Course.find_or_create_by(name: 'Niort-Romagné')
niort.tees.find_or_create_by(color: 'black', slope: 130, sss: 71.2)
niort.tees.find_or_create_by(color: 'white', slope: 130, sss: 71.2)
niort.tees.find_or_create_by(color: 'yellow', slope: 126, sss: 69.5)
niort.tees.find_or_create_by(color: 'blue', slope: 120, sss: 66.7)
niort.tees.find_or_create_by(color: 'red', slope: 118, sss: 65.4)
niort.holes.find_or_create_by(number: 1, par: 5, stroke_index: 5)
niort.holes.find_or_create_by(number: 2, par: 4, stroke_index: 17)
niort.holes.find_or_create_by(number: 3, par: 3, stroke_index: 15)
niort.holes.find_or_create_by(number: 4, par: 4, stroke_index: 7)
niort.holes.find_or_create_by(number: 5, par: 3, stroke_index: 3)
niort.holes.find_or_create_by(number: 6, par: 4, stroke_index: 2)
niort.holes.find_or_create_by(number: 7, par: 4, stroke_index: 13)
niort.holes.find_or_create_by(number: 8, par: 5, stroke_index: 9)
niort.holes.find_or_create_by(number: 9, par: 3, stroke_index: 11)
niort.holes.find_or_create_by(number: 10, par: 5, stroke_index: 6)
niort.holes.find_or_create_by(number: 11, par: 4, stroke_index: 1)
niort.holes.find_or_create_by(number: 12, par: 3, stroke_index: 14)
niort.holes.find_or_create_by(number: 13, par: 4, stroke_index: 4)
niort.holes.find_or_create_by(number: 14, par: 4, stroke_index: 12)
niort.holes.find_or_create_by(number: 15, par: 4, stroke_index: 8)
niort.holes.find_or_create_by(number: 16, par: 4, stroke_index: 16)
niort.holes.find_or_create_by(number: 17, par: 3, stroke_index: 10)
niort.holes.find_or_create_by(number: 18, par: 5, stroke_index: 18)

lajarne = Course.find_or_create_by(name: 'La Rochelle Sud')
lajarne.tees.find_or_create_by(color: 'black', slope: 120, sss: 66.0)
lajarne.tees.find_or_create_by(color: 'white', slope: 120, sss: 66.0)
lajarne.tees.find_or_create_by(color: 'yellow', slope: 118, sss: 65.8)
lajarne.tees.find_or_create_by(color: 'blue', slope: 114, sss: 63.9)
lajarne.tees.find_or_create_by(color: 'red', slope: 114, sss: 63.9)
lajarne.holes.find_or_create_by(number: 1, par: 4, stroke_index: 16)
lajarne.holes.find_or_create_by(number: 2, par: 4, stroke_index: 4)
lajarne.holes.find_or_create_by(number: 3, par: 4, stroke_index: 10)
lajarne.holes.find_or_create_by(number: 4, par: 3, stroke_index: 14)
lajarne.holes.find_or_create_by(number: 5, par: 3, stroke_index: 2)
lajarne.holes.find_or_create_by(number: 6, par: 4, stroke_index: 8)
lajarne.holes.find_or_create_by(number: 7, par: 4, stroke_index: 18)
lajarne.holes.find_or_create_by(number: 8, par: 5, stroke_index: 6)
lajarne.holes.find_or_create_by(number: 9, par: 4, stroke_index: 12)
lajarne.holes.find_or_create_by(number: 10, par: 4, stroke_index: 15)
lajarne.holes.find_or_create_by(number: 11, par: 4, stroke_index: 3)
lajarne.holes.find_or_create_by(number: 12, par: 4, stroke_index: 9)
lajarne.holes.find_or_create_by(number: 13, par: 3, stroke_index: 13)
lajarne.holes.find_or_create_by(number: 14, par: 3, stroke_index: 1)
lajarne.holes.find_or_create_by(number: 15, par: 4, stroke_index: 7)
lajarne.holes.find_or_create_by(number: 16, par: 4, stroke_index: 17)
lajarne.holes.find_or_create_by(number: 17, par: 5, stroke_index: 5)
lajarne.holes.find_or_create_by(number: 18, par: 4, stroke_index: 11)

Player.find_or_create_by(name: 'Renaud Delaville', index: 54)
Player.find_or_create_by(name: 'Yann Allirol', index: 54)
Player.find_or_create_by(name: 'Jérôme Bernier', index: 54)
Player.find_or_create_by(name: 'Eric Parrot', index: 54)
Player.find_or_create_by(name: 'Renaud Martinet', index: 54)
