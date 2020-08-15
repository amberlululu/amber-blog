require 'rails_helper'

RSpec.describe Message, type: :model do
  describe 'messages' do
    it { should belong_to(:user) }
    it { should belong_to(:chat) }
  end 
end 